# Documentação dos Jogos Educativos para Crianças Autistas

## Visão Geral

Este projeto consiste em um site com 10 jogos educativos especialmente desenvolvidos para crianças do espectro autista. Todos os jogos foram criados com foco em acessibilidade, usabilidade e experiência positiva, considerando as necessidades específicas deste público.

### Características Principais

- **Acessibilidade**: Navegação completa por teclado, suporte a leitores de tela, alto contraste
- **Responsividade**: Funciona em qualquer dispositivo (computadores, tablets, smartphones)
- **Feedback Claro**: Visual e sonoro para cada interação
- **Design Amigável**: Cores suaves, interface previsível, instruções claras
- **Tecnologias Simples**: HTML, CSS e JavaScript puro, sem dependências externas

## Jogos Disponíveis

### Jogos Originais

1. **Jogo da Memória**
   - Encontre pares de cartas iguais
   - Três níveis de dificuldade (Fácil, Médio, Difícil)
   - Feedback visual e sonoro para cada interação

2. **Quebra-Cabeças**
   - Monte imagens arrastando as peças
   - Diferentes imagens e níveis de dificuldade
   - Sistema de dicas e ajudas visuais

3. **Sequência de Cores**
   - Memorize e repita sequências de cores e sons
   - Dificuldade progressiva
   - Feedback visual e sonoro para cada interação

4. **Jogo de Ordenar**
   - Organize objetos por tamanho, cor, número ou forma
   - Diferentes categorias e níveis de dificuldade
   - Sistema de verificação e feedback

5. **Sons e Músicas**
   - Explore sons, ritmos e melodias
   - Quatro atividades diferentes
   - Controle de volume e pausas

### Novos Jogos

6. **Jogo de Associação**
   - Relacione objetos, conceitos e categorias
   - Três categorias: Objetos Relacionados, Formas e Cores, Causa e Efeito
   - Três níveis de dificuldade para cada categoria

7. **Expressões Faciais**
   - Reconheça e compreenda emoções
   - Dois modos: Aprender (para conhecer as emoções) e Praticar (para testar conhecimentos)
   - Oito emoções diferentes com descrições e exemplos

8. **Labirinto Simples**
   - Desenvolva coordenação motora e planejamento
   - Três temas: Floresta Encantada, Fundo do Mar e Espaço Sideral
   - Cinco níveis de dificuldade para cada tema

9. **Jogo de Contagem**
   - Aprenda matemática básica de forma divertida
   - Três modos: Contar, Relacionar e Sequência
   - Três níveis de dificuldade para cada modo

10. **História Interativa**
    - Explore situações sociais com escolhas e consequências
    - Três histórias diferentes: Um Dia na Escola, Aventura no Parque, Festa de Aniversário
    - Múltiplos caminhos e finais diferentes

## Estrutura do Projeto

```
html_jogos_v2/
├── index.html                # Página principal com menu de jogos
├── games/                    # Páginas HTML de cada jogo
│   ├── memory.html           # Jogo da Memória
│   ├── puzzle.html           # Quebra-Cabeças
│   ├── colors.html           # Sequência de Cores
│   ├── sorting.html          # Jogo de Ordenar
│   ├── music.html            # Sons e Músicas
│   ├── association.html      # Jogo de Associação
│   ├── expressions.html      # Expressões Faciais
│   ├── maze.html             # Labirinto Simples
│   ├── counting.html         # Jogo de Contagem
│   └── story.html            # História Interativa
├── styles/                   # Arquivos CSS
│   ├── main.css              # Estilos globais
│   ├── memory.css            # Estilos do Jogo da Memória
│   ├── puzzle.css            # Estilos do Quebra-Cabeças
│   ├── colors.css            # Estilos da Sequência de Cores
│   ├── sorting.css           # Estilos do Jogo de Ordenar
│   ├── music.css             # Estilos de Sons e Músicas
│   ├── association.css       # Estilos do Jogo de Associação
│   ├── expressions.css       # Estilos de Expressões Faciais
│   ├── maze.css              # Estilos do Labirinto Simples
│   ├── counting.css          # Estilos do Jogo de Contagem
│   └── story.css             # Estilos da História Interativa
├── scripts/                  # Arquivos JavaScript
│   ├── main.js               # Script principal e utilitários
│   ├── memory.js             # Lógica do Jogo da Memória
│   ├── puzzle.js             # Lógica do Quebra-Cabeças
│   ├── colors.js             # Lógica da Sequência de Cores
│   ├── sorting.js            # Lógica do Jogo de Ordenar
│   ├── music.js              # Lógica de Sons e Músicas
│   ├── association.js        # Lógica do Jogo de Associação
│   ├── expressions.js        # Lógica de Expressões Faciais
│   ├── maze.js               # Lógica do Labirinto Simples
│   ├── counting.js           # Lógica do Jogo de Contagem
│   └── story.js              # Lógica da História Interativa
└── assets/                   # Recursos (imagens, sons, etc.)
    ├── images/               # Imagens
    ├── sounds/               # Sons
    └── fonts/                # Fontes (se necessário)
```

## Instruções de Uso

### Uso Online

O site está disponível online em: [https://watulska.manus.space](https://watulska.manus.space)

### Uso Local

1. Extraia o arquivo ZIP em qualquer pasta do seu computador
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Navegue pelos jogos clicando nos botões da página inicial

### Hospedagem Própria

Para hospedar o site em seu próprio domínio:

1. Faça upload de todos os arquivos para seu servidor web
2. Não é necessária nenhuma configuração especial, pois o site usa apenas HTML, CSS e JavaScript puro
3. O site funcionará em qualquer servidor web básico

## Modificação e Personalização

### Adicionando Novas Imagens

1. Adicione as imagens na pasta `assets/images/`
2. Atualize as referências nos arquivos HTML ou JavaScript correspondentes

### Modificando Textos

1. Abra os arquivos HTML dos jogos que deseja modificar
2. Localize e altere os textos conforme necessário

### Alterando Cores e Estilos

1. Modifique os arquivos CSS na pasta `styles/`
2. As variáveis de cores globais estão definidas em `main.css`

### Adicionando Novos Jogos

1. Crie um novo arquivo HTML na pasta `games/`
2. Crie arquivos CSS e JavaScript correspondentes
3. Adicione um novo botão no arquivo `index.html`
4. Atualize o objeto `gameNames` no arquivo `scripts/main.js`

## Considerações de Acessibilidade

### Navegação por Teclado

- Todos os elementos interativos são acessíveis via teclado
- Use Tab para navegar entre elementos
- Use Enter ou Espaço para ativar botões
- Jogos com controles específicos têm instruções na tela

### Leitores de Tela

- Todos os elementos têm descrições adequadas para leitores de tela
- Anúncios dinâmicos informam sobre mudanças de estado
- Instruções são fornecidas em texto claro

### Controle de Som

- Todos os sons podem ser ativados/desativados com um único botão
- A configuração de som é mantida entre os jogos
- Feedback visual é sempre fornecido, mesmo com sons desativados

## Suporte e Contato

Para dúvidas, sugestões ou problemas, entre em contato através do e-mail de suporte.

---

Desenvolvido especialmente para crianças do espectro autista, com foco em acessibilidade, usabilidade e experiência positiva.



11. **Jogo de Comunicação Alternativa (PECS)**
   - Aprenda e utilize símbolos de comunicação alternativa (baseado no sistema PECS).
   - Três modos:
     - **Aprender**: Explore categorias de símbolos (Pessoas, Ações, Objetos, etc.) e ouça seus nomes e sons.
     - **Construir Frases**: Combine símbolos para formar frases simples (ex: "Eu quero água"). Suporta clique e drag-and-drop acessível (mouse e teclado).
     - **Praticar**: Responda a cenários de comunicação utilizando os símbolos aprendidos (ex: "O que você diz quando está com sede?").
   - Feedback visual e sonoro, com anúncios claros para leitores de tela.
   - Símbolos e cenários facilmente personalizáveis no código JavaScript (`scripts/communication.js`).

## Estrutura do Projeto

```
html_jogos_v2/
├── index.html                # Página principal com menu de jogos
├── games/
│   ├── memory.html
│   ├── puzzle.html
│   ├── colors.html
│   ├── sorting.html
│   ├── music.html
│   ├── association.html
│   ├── expressions.html
│   ├── maze.html
│   ├── counting.html
│   ├── story.html
│   └── communication.html    # Jogo de Comunicação (PECS)
├── styles/
│   ├── main.css
│   ├── memory.css
│   ├── puzzle.css
│   ├── colors.css
│   ├── sorting.css
│   ├── music.css
│   ├── association.css
│   ├── expressions.css
│   ├── maze.css
│   ├── counting.css
│   ├── story.css
│   └── communication.css     # Estilos do Jogo de Comunicação
├── scripts/
│   ├── main.js
│   ├── memory.js
│   ├── puzzle.js
│   ├── colors.js
│   ├── sorting.js
│   ├── music.js
│   ├── association.js
│   ├── expressions.js
│   ├── maze.js
│   ├── counting.js
│   ├── story.js
│   └── communication.js      # Lógica do Jogo de Comunicação
└── assets/
    ├── images/
    │   └── pecs/             # Imagens dos símbolos PECS
    ├── sounds/
    │   └── speech/           # Sons dos símbolos PECS (placeholders)
    └── fonts/
```

## Instruções de Uso

[...]

### Modificação e Personalização

[...]

#### Jogo de Comunicação (PECS)

- **Símbolos**: Adicione/edite objetos no array `categories` dentro de `scripts/communication.js`. Certifique-se de que as imagens correspondentes estejam em `assets/images/pecs/` e os sons (se houver) em `assets/sounds/speech/`.
- **Cenários (Modo Prática)**: Adicione/edite objetos no array `practiceScenarios` dentro de `scripts/communication.js`. O `answer` deve ser um array de IDs de símbolos na ordem correta.

## Considerações de Acessibilidade

[...]

### Jogo de Comunicação (PECS) - Acessibilidade Específica

- **Drag-and-Drop Acessível (Modo Construir)**:
    - **Mouse**: Arraste o símbolo da grade para a área da frase.
    - **Teclado**: Navegue até o símbolo desejado com Tab, pressione Enter ou Espaço para "pegar" o símbolo (feedback visual e sonoro será dado). Navegue até a área da frase (que receberá foco automaticamente) e pressione Enter ou Espaço novamente para "soltar" o símbolo na frase.
- **Remoção de Símbolos (Modo Construir/Prática)**:
    - **Mouse**: Clique no botão 'X' no canto do símbolo dentro da área da frase/resposta.
    - **Teclado**: Navegue até o símbolo desejado na área da frase/resposta e pressione Delete ou Backspace.
- **Leitores de Tela**: Todas as ações (seleção de modo, categoria, símbolo, adição/remoção da frase, leitura da frase, feedback de prática) são anunciadas.

[...]

