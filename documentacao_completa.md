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


