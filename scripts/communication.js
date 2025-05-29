/**
 * Jogo de Comunicação Alternativa (PECS)
 * Permite aprender símbolos, construir frases e praticar cenários.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do DOM Cache --- 
    const modeSelection = document.querySelector('.mode-selection');
    const learnModeSection = document.getElementById('learn-mode');
    const buildModeSection = document.getElementById('build-mode');
    const practiceModeSection = document.getElementById('practice-mode');
    const modeLearnButton = document.getElementById('mode-learn');
    const modeBuildButton = document.getElementById('mode-build');
    const modePracticeButton = document.getElementById('mode-practice');
    const announcer = document.getElementById('screen-reader-announcer'); // Para feedback de leitor de tela

    // --- Dados do Jogo (Exemplo - Substituir por dados reais/dinâmicos) ---
    const categories = {
        'pessoas': { name: 'Pessoas', symbols: [
            { id: 'p1', text: 'Eu', image: '../assets/images/pecs/pessoa_eu.png', sound: '../assets/sounds/speech/placeholder_eu.mp3' },
            { id: 'p2', text: 'Você', image: '../assets/images/pecs/pessoa_voce.png', sound: '../assets/sounds/speech/placeholder_voce.mp3' },
            { id: 'p3', text: 'Mamãe', image: '../assets/images/pecs/pessoa_mamae.png', sound: '../assets/sounds/speech/placeholder_mamae.mp3' },
        ]},
        'acoes': { name: 'Ações', symbols: [
            { id: 'a1', text: 'Quero', image: '../assets/images/pecs/acao_quero.png', sound: '../assets/sounds/speech/placeholder_quero.mp3' },
            { id: 'a2', text: 'Comer', image: '../assets/images/pecs/acao_comer.png', sound: '../assets/sounds/speech/placeholder_comer.mp3' },
            { id: 'a3', text: 'Brincar', image: '../assets/images/pecs/acao_brincar.png', sound: '../assets/sounds/speech/placeholder_brincar.mp3' },
        ]},
        'objetos': { name: 'Objetos', symbols: [
            { id: 'o1', text: 'Bola', image: '../assets/images/pecs/objeto_bola.png', sound: '../assets/sounds/speech/placeholder_bola.mp3' },
            { id: 'o2', text: 'Água', image: '../assets/images/pecs/objeto_agua.png', sound: '../assets/sounds/speech/placeholder_agua.mp3' },
            { id: 'o3', text: 'Biscoito', image: '../assets/images/pecs/objeto_biscoito.png', sound: '../assets/sounds/speech/placeholder_biscoito.mp3' },
        ]}
        // TODO: Adicionar mais categorias e símbolos conforme necessário
    };

    // Cenários para o modo Prática
    const practiceScenarios = [
        { id: 's1', scenario: 'Você está com sede. O que você diz?', answer: ['p1', 'a1', 'o2'] }, // Eu quero água
        { id: 's2', scenario: 'Você quer brincar com a bola. O que você diz?', answer: ['p1', 'a1', 'a3', 'o1'] } // Eu quero brincar bola
        // TODO: Adicionar mais cenários de prática
    ];

    // --- Estado do Jogo ---
    let currentMode = null;         // 'learn', 'build', 'practice'
    let currentCategory = null;     // Chave da categoria selecionada (ex: 'pessoas')
    let sentence = [];              // Array de objetos de símbolo na frase atual (modo build)
    let currentScenario = null;     // Objeto do cenário atual (modo practice)
    let practiceAnswer = [];        // Array de objetos de símbolo na resposta atual (modo practice)
    let keyboardSelectedSymbol = null; // { element: HTMLElement, symbol: Object } - Para drag/drop via teclado

    // --- Funções Auxiliares ---

    /**
     * Encontra um símbolo pelo seu ID em todas as categorias.
     * @param {string} symbolId - O ID do símbolo a ser encontrado.
     * @returns {Object|null} O objeto do símbolo encontrado ou null se não encontrado.
     */
    function findSymbolById(symbolId) {
        for (const categoryKey in categories) {
            const foundSymbol = categories[categoryKey].symbols.find(s => s.id === symbolId);
            if (foundSymbol) {
                return foundSymbol;
            }
        }
        return null; // Symbol not found
    }

    /**
     * Anuncia uma mensagem para leitores de tela.
     * @param {string} message - A mensagem a ser anunciada.
     */
    function announce(message) {
        if (announcer) {
            // Usar aria-live="assertive" para garantir que seja lido imediatamente
            announcer.setAttribute('aria-live', 'assertive');
            announcer.textContent = message;
            // Resetar para polite após um tempo para não interromper demais
            setTimeout(() => {
                if (announcer) announcer.setAttribute('aria-live', 'polite');
            }, 500);
        } else {
            console.warn("Elemento anunciador não encontrado.");
        }
    }

    /**
     * Toca um arquivo de som, verificando se o som está habilitado globalmente.
     * @param {string} soundSrc - O caminho para o arquivo de som.
     */
    function playSound(soundSrc) {
        // Verifica se a função global de verificação de som existe e se o som está habilitado
        if (typeof window.isSoundEnabled === 'function' && window.isSoundEnabled()) {
            const audio = new Audio(soundSrc);
            audio.play().catch(e => console.error(`Erro ao tocar som ${soundSrc}:`, e));
        } else if (typeof window.isSoundEnabled !== 'function') {
            console.warn("Função global isSoundEnabled não encontrada. Som não será tocado.");
        }
        // Se isSoundEnabled() retornar false, não faz nada (som desabilitado)
    }

    /**
     * Exibe a seção do modo de jogo selecionado e oculta as outras.
     * @param {string|null} mode - O modo a ser exibido ('learn', 'build', 'practice') ou null para voltar à seleção.
     */
    function showMode(mode) {
        // Oculta todas as seções primeiro
        modeSelection.classList.add('hidden');
        learnModeSection.classList.add('hidden');
        buildModeSection.classList.add('hidden');
        practiceModeSection.classList.add('hidden');

        // Mostra a seção correta e inicializa
        switch (mode) {
            case 'learn':
                learnModeSection.classList.remove('hidden');
                currentMode = 'learn';
                initializeLearnMode();
                announce("Modo Aprendizado ativado.");
                break;
            case 'build':
                buildModeSection.classList.remove('hidden');
                currentMode = 'build';
                initializeBuildMode();
                announce("Modo Construção de Frases ativado.");
                break;
            case 'practice':
                practiceModeSection.classList.remove('hidden');
                currentMode = 'practice';
                initializePracticeMode();
                announce("Modo Prática ativado.");
                break;
            default: // null ou inválido
                modeSelection.classList.remove('hidden');
                currentMode = null;
                announce("Seleção de modo.");
                break;
        }
    }

    /**
     * Cria um card de símbolo (botão) com imagem e texto.
     * @param {Object} symbol - O objeto do símbolo.
     * @param {boolean} [isDraggable=false] - Se o card deve ser arrastável (para modo build).
     * @returns {HTMLElement} O elemento do card criado.
     */
    function createSymbolCard(symbol, isDraggable = false) {
        const card = document.createElement("button");
        card.className = "symbol-card";
        card.dataset.symbolId = symbol.id;
        card.setAttribute("aria-label", symbol.text);
        card.innerHTML = `
            <img src="${symbol.image}" alt="" class="symbol-image" aria-hidden="true">
            <span class="symbol-text">${symbol.text}</span>
        `;
        // Ação principal: ouvir/anunciar ou adicionar à frase/resposta
        card.addEventListener("click", () => handleSymbolClick(symbol));

        // Funcionalidade de Drag & Drop (se aplicável)
        if (isDraggable) {
            card.draggable = true;
            card.tabIndex = 0; // Torna focável via teclado
            card.setAttribute("role", "button");
            card.setAttribute("aria-grabbed", "false"); // Estado inicial

            // Eventos de Drag (Mouse)
            card.addEventListener("dragstart", (event) => {
                try {
                    event.dataTransfer.setData("text/plain", symbol.id);
                    event.dataTransfer.effectAllowed = "copy";
                    card.classList.add("dragging");
                    card.setAttribute("aria-grabbed", "true");
                    announce(`Arrastando ${symbol.text}`);
                } catch (e) {
                    console.error("Erro no dragstart:", e);
                }
            });
            card.addEventListener("dragend", () => {
                card.classList.remove("dragging");
                card.setAttribute("aria-grabbed", "false");
                // Opcional: anunciar fim do arraste
            });

            // Simulação de Drag (Teclado: Selecionar/Desselecionar)
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault(); // Previne scroll ou ativação dupla
                    toggleKeyboardDragSelection(card, symbol);
                }
                // TODO: Adicionar navegação por setas dentro do grid, se necessário
            });
        }

        return card;
    }

    /**
     * Gerencia a seleção/desseleção de um símbolo via teclado para simular drag.
     * @param {HTMLElement} cardElement - O elemento do card selecionado.
     * @param {Object} symbol - O objeto do símbolo correspondente.
     */
    function toggleKeyboardDragSelection(cardElement, symbol) {
        const sentenceArea = buildModeSection.querySelector(".sentence-area");

        if (keyboardSelectedSymbol && keyboardSelectedSymbol.element === cardElement) {
            // Desselecionar o símbolo atual
            cardElement.classList.remove("keyboard-selected");
            cardElement.setAttribute("aria-grabbed", "false");
            announce(`${symbol.text} deselecionado.`);
            keyboardSelectedSymbol = null;
        } else {
            // Desselecionar o anterior, se houver
            if (keyboardSelectedSymbol) {
                keyboardSelectedSymbol.element.classList.remove("keyboard-selected");
                keyboardSelectedSymbol.element.setAttribute("aria-grabbed", "false");
            }
            // Selecionar o novo símbolo
            cardElement.classList.add("keyboard-selected");
            cardElement.setAttribute("aria-grabbed", "true");
            keyboardSelectedSymbol = { element: cardElement, symbol: symbol };
            announce(`${symbol.text} selecionado. Navegue até a área da frase e pressione Enter ou Espaço para soltar.`);
            // Move o foco para a área de soltar para facilitar
            if (sentenceArea) sentenceArea.focus();
        }
    }

    /**
     * Ação executada ao clicar em um símbolo (depende do modo atual).
     * @param {Object} symbol - O objeto do símbolo clicado.
     */
    function handleSymbolClick(symbol) {
        playSound(symbol.sound);
        announce(symbol.text);

        // Ação específica do modo
        if (currentMode === 'build') {
            addSymbolToSentence(symbol);
        } else if (currentMode === 'practice') {
            addSymbolToPracticeAnswer(symbol);
        }
        // No modo 'learn', apenas ouvir/anunciar já é suficiente.
    }

    /**
     * Popula a área de seleção de categorias com botões.
     * @param {HTMLElement} selectorElement - O elemento container para os botões de categoria.
     */
    function populateCategories(selectorElement) {
        if (!selectorElement) return;
        selectorElement.innerHTML = ''; // Limpa antes de popular
        Object.keys(categories).forEach(key => {
            const category = categories[key];
            const button = document.createElement('button');
            button.className = 'category-button';
            button.textContent = category.name;
            button.dataset.categoryKey = key;
            button.addEventListener('click', () => selectCategory(key));
            selectorElement.appendChild(button);
        });
    }

    /**
     * Seleciona uma categoria, atualiza o estado e popula o grid de símbolos.
     * @param {string} categoryKey - A chave da categoria selecionada.
     */
    function selectCategory(categoryKey) {
        if (!categories[categoryKey]) return; // Categoria inválida

        currentCategory = categoryKey;

        // Atualiza visualmente o botão ativo
        const categoryButtons = document.querySelectorAll(`.${currentMode}-mode .category-button`);
        categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.categoryKey === categoryKey);
        });

        // Popula o grid correspondente ao modo atual
        populateSymbolGrid(categories[categoryKey].symbols);
        announce(`Categoria ${categories[categoryKey].name} selecionada.`);
    }

    /**
     * Popula o grid de símbolos do modo atual com os símbolos fornecidos.
     * @param {Array<Object>} symbols - Array de objetos de símbolo.
     */
    function populateSymbolGrid(symbols) {
        let gridElement;
        let isDraggable = false;

        // Determina qual grid popular e se os itens são arrastáveis
        switch (currentMode) {
            case 'learn':
                gridElement = learnModeSection.querySelector('.symbol-grid');
                break;
            case 'build':
                gridElement = buildModeSection.querySelector('.symbol-grid');
                isDraggable = true;
                break;
            case 'practice':
                gridElement = practiceModeSection.querySelector('.symbol-grid');
                // Poderia ser arrastável aqui também, se a prática envolvesse montar frases
                break;
        }

        if (gridElement) {
            gridElement.innerHTML = ''; // Limpa o grid
            if (symbols && symbols.length > 0) {
                symbols.forEach(symbol => {
                    const card = createSymbolCard(symbol, isDraggable);
                    gridElement.appendChild(card);
                });
            } else {
                gridElement.innerHTML = '<p>Nenhum símbolo nesta categoria.</p>';
            }
        } else {
            console.error(`Grid de símbolos não encontrado para o modo ${currentMode}`);
        }
    }

    // --- Inicialização dos Modos ---

    /**
     * Inicializa o Modo Aprendizado.
     */
    function initializeLearnMode() {
        const categorySelector = learnModeSection.querySelector('.category-selector');
        const symbolGrid = learnModeSection.querySelector('.symbol-grid');
        populateCategories(categorySelector);
        symbolGrid.innerHTML = '<p>Selecione uma categoria para ver os símbolos.</p>';
        // Seleciona a primeira categoria por padrão
        const firstCategoryKey = Object.keys(categories)[0];
        if (firstCategoryKey) {
            selectCategory(firstCategoryKey);
        } else {
            symbolGrid.innerHTML = '<p>Nenhuma categoria de símbolos disponível.</p>';
        }
        announce("Modo Aprendizado. Selecione uma categoria e clique em um símbolo para ouvir.");
    }

    /**
     * Inicializa o Modo Construção de Frases.
     */
    function initializeBuildMode() {
        const categorySelector = buildModeSection.querySelector('.category-selector');
        const sentenceArea = buildModeSection.querySelector('.sentence-area');
        const readButton = document.getElementById('read-sentence');
        const clearButton = document.getElementById('clear-sentence');

        sentence = []; // Reseta a frase
        keyboardSelectedSymbol = null; // Reseta seleção de teclado
        renderSentence(); // Renderiza a área de frase (vazia)
        populateCategories(categorySelector);

        // Habilita botões
        if (readButton) readButton.disabled = false;
        if (clearButton) clearButton.disabled = false;

        // Associa eventos aos botões (se ainda não associados)
        if (readButton && !readButton.onclick) readButton.onclick = readCurrentSentence;
        if (clearButton && !clearButton.onclick) clearButton.onclick = clearCurrentSentence;

        // --- Listeners de Drag & Drop para a Área da Frase ---
        // Remover listeners antigos para evitar duplicação se a função for chamada múltiplas vezes
        // (Uma abordagem mais robusta usaria AbortController ou removeria listeners específicos)
        const newSentenceArea = sentenceArea.cloneNode(true); // Clona para remover listeners antigos
        sentenceArea.parentNode.replaceChild(newSentenceArea, sentenceArea);
        const currentSentenceArea = buildModeSection.querySelector('.sentence-area'); // Pega a referência do novo nó

        if (currentSentenceArea) {
            currentSentenceArea.tabIndex = -1; // Torna focável programaticamente
            currentSentenceArea.setAttribute('role', 'region');
            currentSentenceArea.setAttribute('aria-label', 'Área da frase. Arraste símbolos aqui ou selecione um símbolo com Enter/Espaço, navegue para cá e pressione Enter/Espaço para soltar.');

            // Eventos de Drop (Mouse)
            currentSentenceArea.addEventListener('dragover', (event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
                currentSentenceArea.classList.add('drag-over');
            });
            currentSentenceArea.addEventListener('dragenter', (event) => {
                if (event.target === currentSentenceArea) announce('Área de soltar frase');
                currentSentenceArea.classList.add('drag-over');
            });
            currentSentenceArea.addEventListener('dragleave', (event) => {
                if (event.target === currentSentenceArea || !currentSentenceArea.contains(event.relatedTarget)) {
                    currentSentenceArea.classList.remove('drag-over');
                }
            });
            currentSentenceArea.addEventListener('drop', (event) => {
                event.preventDefault();
                currentSentenceArea.classList.remove('drag-over');
                try {
                    const symbolId = event.dataTransfer.getData('text/plain');
                    const droppedSymbol = findSymbolById(symbolId);
                    if (droppedSymbol) {
                        addSymbolToSentence(droppedSymbol);
                        announce(`${droppedSymbol.text} solto na frase.`);
                    }
                } catch (e) {
                    console.error("Erro ao processar drop:", e);
                }
            });

            // Evento de Drop (Teclado)
            currentSentenceArea.addEventListener('keydown', (event) => {
                if ((event.key === 'Enter' || event.key === ' ') && keyboardSelectedSymbol) {
                    event.preventDefault();
                    addSymbolToSentence(keyboardSelectedSymbol.symbol);
                    announce(`${keyboardSelectedSymbol.symbol.text} adicionado à frase.`);
                    // Desseleciona o símbolo
                    keyboardSelectedSymbol.element.classList.remove('keyboard-selected');
                    keyboardSelectedSymbol.element.setAttribute('aria-grabbed', 'false');
                    keyboardSelectedSymbol = null;
                    // Opcional: Mover foco de volta ao grid
                    // buildModeSection.querySelector('.symbol-grid button')?.focus();
                }
            });
        }

        // Seleciona a primeira categoria
        const firstCategoryKey = Object.keys(categories)[0];
        if (firstCategoryKey) {
            selectCategory(firstCategoryKey);
        } else {
            buildModeSection.querySelector('.symbol-grid').innerHTML = '<p>Nenhuma categoria de símbolos disponível.</p>';
        }
        announce("Modo Construção de Frases. Selecione categorias, clique ou arraste/selecione com teclado os símbolos para adicionar à frase abaixo.");
    }

    /**
     * Inicializa o Modo Prática.
     */
    function initializePracticeMode() {
        const scenarioDisplay = practiceModeSection.querySelector('.scenario-display');
        const symbolGrid = practiceModeSection.querySelector('.symbol-grid');
        const feedbackArea = practiceModeSection.querySelector('.feedback-area');
        let answerArea = practiceModeSection.querySelector('.practice-answer-area');

        // Limpeza inicial
        feedbackArea.innerHTML = '';
        feedbackArea.className = 'feedback-area'; // Reseta classes de feedback
        practiceAnswer = [];

        // Cria a área de resposta dinamicamente se não existir
        if (!answerArea) {
            answerArea = document.createElement('div');
            answerArea.className = 'practice-answer-area sentence-area'; // Reutiliza estilo
            answerArea.innerHTML = `
                <h4>Sua Resposta:</h4>
                <div class="sentence-slots practice-slots"><p>Clique nos símbolos para formar sua resposta.</p></div>
                <div class="practice-controls">
                    <button id="check-practice-answer">Verificar Resposta</button>
                    <button id="clear-practice-answer">Limpar Resposta</button>
                </div>
            `;
            // Insere antes da área de feedback
            practiceModeSection.insertBefore(answerArea, feedbackArea);
            // Adiciona listeners aos novos botões
            document.getElementById('check-practice-answer').addEventListener('click', checkPracticeAnswer);
            document.getElementById('clear-practice-answer').addEventListener('click', clearPracticeAnswer);
        } else {
            // Se já existe, apenas limpa os slots
            renderPracticeAnswer();
        }

        // Carrega um cenário aleatório (evitando repetição imediata)
        let nextScenarioIndex = Math.floor(Math.random() * practiceScenarios.length);
        if (practiceScenarios.length > 1 && currentScenario && practiceScenarios[nextScenarioIndex].id === currentScenario.id) {
            nextScenarioIndex = (nextScenarioIndex + 1) % practiceScenarios.length;
        }
        currentScenario = practiceScenarios[nextScenarioIndex];
        scenarioDisplay.textContent = currentScenario.scenario;

        // Popula o grid com todos os símbolos (embaralhados)
        let allSymbols = [];
        Object.values(categories).forEach(cat => allSymbols.push(...cat.symbols));
        allSymbols.sort(() => Math.random() - 0.5); // Embaralha
        populateSymbolGrid(allSymbols);

        announce(`Modo Prática. Cenário: ${currentScenario.scenario}. Selecione os símbolos corretos.`);
    }


    // --- Lógica do Modo Construção ---

    /**
     * Adiciona um símbolo à frase atual (máx 10).
     * @param {Object} symbol - O símbolo a ser adicionado.
     */
    function addSymbolToSentence(symbol) {
        if (sentence.length < 10) {
            sentence.push(symbol);
            renderSentence();
            // Announce é feito no drop/click/keydown
        } else {
            announce("Limite de 10 símbolos na frase atingido.");
        }
    }

    /**
     * Remove um símbolo da frase pelo seu índice.
     * @param {number} index - O índice do símbolo a ser removido.
     */
    function removeSymbolFromSentence(index) {
        if (index >= 0 && index < sentence.length) {
            const removedSymbol = sentence.splice(index, 1)[0];
            renderSentence();
            announce(`${removedSymbol.text} removido da frase.`);
            // Opcional: Mover foco para o botão Limpar ou Ler após remover
            buildModeSection.querySelector('.sentence-slot button.remove-symbol-btn')?.focus(); // Tenta focar no próximo botão de remover
        }
    }

    /**
     * Renderiza a frase atual na área de slots.
     */
    function renderSentence() {
        const sentenceSlots = buildModeSection.querySelector(".sentence-slots");
        if (!sentenceSlots) return;

        sentenceSlots.innerHTML = ""; // Limpa área
        if (sentence.length === 0) {
            sentenceSlots.innerHTML = '<p class="placeholder-text">Clique ou arraste símbolos aqui para formar sua frase.</p>';
        } else {
            sentence.forEach((symbol, index) => {
                const slot = document.createElement("div");
                slot.className = "sentence-slot symbol-card"; // Reutiliza estilo
                slot.dataset.index = index;
                slot.setAttribute("role", "listitem");
                slot.tabIndex = 0; // Permite focar nos itens da frase
                slot.setAttribute("aria-label", `${symbol.text}, item ${index + 1} de ${sentence.length}. Clique para ouvir, pressione Delete para remover.`);

                const img = document.createElement("img");
                img.src = symbol.image;
                img.alt = "";
                img.className = "symbol-image";
                img.setAttribute("aria-hidden", "true");

                const text = document.createElement("span");
                text.className = "symbol-text";
                text.textContent = symbol.text;

                // Botão de remover integrado e mais acessível
                const removeBtn = document.createElement("button");
                removeBtn.innerHTML = "&times;"; // Símbolo 'X'
                removeBtn.className = "remove-symbol-btn";
                removeBtn.setAttribute("aria-label", `Remover ${symbol.text}`);
                removeBtn.title = `Remover ${symbol.text}`;
                removeBtn.onclick = (e) => {
                    e.stopPropagation(); // Evita que o clique no botão acione o slot
                    removeSymbolFromSentence(index);
                };

                slot.appendChild(img);
                slot.appendChild(text);
                slot.appendChild(removeBtn);

                // Ouvir o som do símbolo na frase
                slot.addEventListener('click', () => {
                    playSound(symbol.sound);
                    announce(symbol.text);
                });

                // Remover com tecla Delete quando focado
                slot.addEventListener('keydown', (e) => {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        e.preventDefault();
                        removeSymbolFromSentence(index);
                    }
                    // TODO: Adicionar navegação por setas entre os slots da frase?
                });

                sentenceSlots.appendChild(slot);
            });
        }
    }

    /**
     * Lê a frase atual em voz alta (simulada pelos sons dos símbolos).
     */
    async function readCurrentSentence() {
        if (sentence.length === 0) {
            announce("Nenhum símbolo na frase para ler.");
            return;
        }
        announce("Lendo a frase completa:");

        // Desabilita botões durante a leitura
        const readButton = document.getElementById('read-sentence');
        const clearButton = document.getElementById('clear-sentence');
        if (readButton) readButton.disabled = true;
        if (clearButton) clearButton.disabled = true;

        // Itera pela frase tocando som de cada símbolo sequencialmente
        for (const symbol of sentence) {
            await new Promise(resolve => {
                // Verifica se o som está habilitado antes de criar o Audio
                if (typeof window.isSoundEnabled === 'function' && window.isSoundEnabled()) {
                    const audio = new Audio(symbol.sound);
                    audio.onended = resolve; // Resolve quando o som termina
                    audio.onerror = () => { console.error(`Erro ao carregar som: ${symbol.sound}`); resolve(); }; // Resolve em caso de erro
                    audio.play().catch(e => { console.error(`Erro ao tocar som ${symbol.sound}:`, e); resolve(); });
                } else {
                    // Se som desabilitado, simula uma pausa
                    setTimeout(resolve, 300);
                }
            });
        }

        announce("Fim da leitura da frase.");
        // Reabilita botões
        if (readButton) readButton.disabled = false;
        if (clearButton) clearButton.disabled = false;
    }

    /**
     * Limpa a frase atual.
     */
    function clearCurrentSentence() {
        sentence = [];
        renderSentence();
        announce("Frase limpa.");
        // Foca no primeiro botão de categoria ou no grid
        buildModeSection.querySelector('.category-button')?.focus();
    }

    // --- Lógica do Modo Prática ---

    /**
     * Adiciona um símbolo à resposta da prática.
     * @param {Object} symbol - O símbolo a ser adicionado.
     */
    function addSymbolToPracticeAnswer(symbol) {
        if (practiceAnswer.length < 10) { // Limite
            practiceAnswer.push(symbol);
            renderPracticeAnswer();
            // Announce é feito no click
        } else {
            announce("Limite de símbolos na resposta atingido.");
        }
    }

    /**
     * Remove um símbolo da resposta da prática pelo índice.
     * @param {number} index - O índice do símbolo a remover.
     */
    function removeSymbolFromPracticeAnswer(index) {
        if (index >= 0 && index < practiceAnswer.length) {
            const removedSymbol = practiceAnswer.splice(index, 1)[0];
            renderPracticeAnswer();
            announce(`${removedSymbol.text} removido da resposta.`);
            // Foca no próximo botão de remover, se houver
            practiceModeSection.querySelector('.practice-slots .remove-symbol-btn')?.focus();
        }
    }

    /**
     * Renderiza a resposta atual da prática na área de slots.
     */
    function renderPracticeAnswer() {
        const practiceSlots = practiceModeSection.querySelector('.practice-slots');
        if (!practiceSlots) return;

        practiceSlots.innerHTML = '';
        if (practiceAnswer.length === 0) {
            practiceSlots.innerHTML = '<p class="placeholder-text">Clique nos símbolos acima para formar sua resposta.</p>';
        } else {
            practiceAnswer.forEach((symbol, index) => {
                const slot = document.createElement('div');
                slot.className = 'sentence-slot symbol-card'; // Reutiliza estilo
                slot.dataset.index = index;
                slot.setAttribute('role', 'listitem');
                slot.tabIndex = 0;
                slot.setAttribute('aria-label', `${symbol.text}, item ${index + 1} de ${practiceAnswer.length}. Clique para ouvir, Delete para remover.`);

                slot.innerHTML = `
                    <img src="${symbol.image}" alt="" class="symbol-image" aria-hidden="true">
                    <span class="symbol-text">${symbol.text}</span>
                    <button class="remove-symbol-btn" aria-label="Remover ${symbol.text}" title="Remover ${symbol.text}">&times;</button>
                `;
                slot.querySelector('.remove-symbol-btn').onclick = (e) => {
                    e.stopPropagation();
                    removeSymbolFromPracticeAnswer(index);
                };
                slot.addEventListener('click', () => {
                    playSound(symbol.sound);
                    announce(symbol.text);
                });
                slot.addEventListener('keydown', (e) => {
                    if (e.key === 'Delete' || e.key === 'Backspace') {
                        e.preventDefault();
                        removeSymbolFromPracticeAnswer(index);
                    }
                });
                practiceSlots.appendChild(slot);
            });
        }
    }

    /**
     * Limpa a resposta da prática e a área de feedback.
     */
    function clearPracticeAnswer() {
        practiceAnswer = [];
        renderPracticeAnswer();
        const feedbackArea = practiceModeSection.querySelector('.feedback-area');
        feedbackArea.innerHTML = '';
        feedbackArea.className = 'feedback-area';
        announce("Resposta limpa.");
        practiceModeSection.querySelector('.symbol-card')?.focus(); // Foca no primeiro símbolo do grid
    }

    /**
     * Verifica se a resposta da prática está correta.
     */
    function checkPracticeAnswer() {
        const feedbackArea = practiceModeSection.querySelector('.feedback-area');
        if (!currentScenario) return; // Sai se não houver cenário

        const answerIds = practiceAnswer.map(s => s.id);
        const correctIds = currentScenario.answer;

        // Comparação simples (ordem importa)
        const isCorrect = answerIds.length === correctIds.length && answerIds.every((id, index) => id === correctIds[index]);

        if (isCorrect) {
            feedbackArea.textContent = 'Correto! Muito bem!';
            feedbackArea.className = 'feedback-area feedback-correct';
            announce('Correto! Muito bem!');
            // Toca som de sucesso (se existir globalmente)
            if (typeof window.playSuccessSound === 'function') window.playSuccessSound();
            // Carrega próximo cenário após um delay
            setTimeout(initializePracticeMode, 2500);
        } else {
            feedbackArea.textContent = 'Quase lá! Tente novamente.';
            feedbackArea.className = 'feedback-area feedback-incorrect';
            announce('Incorreto. Tente novamente.');
            // Toca som de erro (se existir globalmente)
            if (typeof window.playErrorSound === 'function') window.playErrorSound();
            // Opcional: Limpar a resposta incorreta automaticamente?
            // clearPracticeAnswer();
        }
    }

    // --- Event Listeners Globais ---
    modeLearnButton.addEventListener('click', () => showMode('learn'));
    modeBuildButton.addEventListener('click', () => showMode('build'));
    modePracticeButton.addEventListener('click', () => showMode('practice'));

    // Botão Voltar (usa função global se disponível)
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        if (typeof window.handleBackButton === 'function') {
            backButton.addEventListener('click', window.handleBackButton);
        } else {
            // Fallback: volta para o index.html
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '../index.html';
            });
        }
    }

    // --- Inicialização --- 
    showMode(null); // Começa na tela de seleção de modo

});
