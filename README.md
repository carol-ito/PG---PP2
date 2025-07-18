# Projeto 2 - PG


Segundo projeto da matéria de Processamento Gráfico da UFSCar Sorocaba, semestre 2025/1.

## 👥 Autores

- [@Caroline Ito Gutierrez](https://www.github.com/carol-ito) - RA: 821689
- [@Enrico Augusto Pagani da Silva](https://www.github.com/EnricoAps) - RA: 822888
- [@Pedro Henrique Pereira Machado](https://www.github.com/pedrohp-machado ) - RA: 828632
- [@Renan Suana Grothe Garcia](https://www.github.com/renangrothe) - RA: 822469


![Demonstração](https://i.imgur.com/BSmiUmQ.gif)

## Componentes

| Elemento         | Descrição                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| 🐞 Joaninha       | Criada com shaders personalizados e animada com movimentação.       |
| 🟨 Pac-Man        | Modelo esférico metálico com boca animada, reflexos e perseguição à joaninha. |
| 🌱 Blocos de Grama | Formam o chão da cena, organizados em uma grade 10x10.                   |
| 🔶 Glowstone      | Cubo emissivo com luz pontual embutida, simulando fonte de iluminação.    |
| 📸 Câmeras        | Troca entre câmera **perspectiva** e **ortográfica** pressionando a tecla `c`. |
| 🌐 Reflexos dinâmicos | O Pac-Man reflete o ambiente em tempo real.      |

---



## Execução

### Pré-requisitos

- Node.js (versão 18+ recomendada)
- Navegador com suporte a **WebGL2** e **ES Modules**

### Navegadores compatíveis

| Navegador            | Versão Mínima | 
| -------------------- | -------------- |
| Google Chrome        | 80             | 
| Mozilla Firefox      | 75             |    
| Microsoft Edge       | 80             | 
| Apple Safari         | 14             | 
| Opera                | 67             |  
| Mobile Chrome (Android) | 80          | 
| Mobile Safari (iOS)  | 14             |   

### Instalação

```bash
git clone https://github.com/carol-ito/PG---PP2.git
cd PG---PP2
npm install
npm run dev
```
Acesse no navegador:
📍 http://localhost:5173


## Principais tecnologias utilizadas

| Ferramenta                                                                          | Descrição                                   |
| ----------------------------------------------------------------------------------- | ------------------------------------------- |
| [Three.js](https://threejs.org/)                                                    | Biblioteca para renderização 3D com WebGL   |
| [TypeScript](https://www.typescriptlang.org/)                                       | Superset do JavaScript com tipagem estática |
| [Vite](https://vitejs.dev/)                                                         | Bundler rápido com suporte a HMR            |
| [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | Estrutura modular nativa do JS moderno      |




## Estrutura do Projeto

```bash
PG---PP2/
├── index.html
├── main.ts
├── vite.config.ts
├── tsconfig.json
├── objetos/
│   ├── objetodacarol.ts       # Joaninha (shader + corpo + cabeça)
│   ├── ladybugAnimation.ts    # Movimento senoidal da joaninha
│   ├── objeto_pedro.ts        # Bloco de grama
│   ├── glowstone.ts           # Cubo luminoso com luz interna
│   └── pacman.ts              # Pac-Man metálico com boca animada
└── public/
    └── assets/                # (opcional) imagens, texturas etc.

```

## Controles
| Ação                         | Tecla/método                          |
| ---------------------------- | ------------------------------------- |
| Trocar entre câmeras         | Pressionar **`C`**                    |
| Orbitar a câmera principal   | Mouse + botão esquerdo                 |
| Redimensionamento automático | Dinâmico ao mudar o tamanho da janela |

## Especificações Atendidas

| Critério de Avaliação                                                       | Atendido                                                  |
| --------------------------------------------------------------------------- | --------------------------------------------------------- |
| ➕ **Visualização de um objeto 3D por membro do grupo**                      | ✅ Sim                                                     |
| 📐 **Redimensionamento e posicionamento individual dos objetos**            | ✅ Sim                                                     |
| 🎨 **Utilização de shader próprio em um dos objetos** | ✅ Sim – aplicado na textura corporal da joaninha          |
| 🎥 **Definição de pelo menos duas câmeras**     | ✅ Sim – alternância com tecla `C` entre perspectiva e ortográfica                      |
| 🎯 **Movimento simples de pelo menos um objeto**                            | ✅ Sim – animação da joaninha e perseguição do Pac-Man     |
| 🧱 **Aplicação de textura em pelo menos um objeto**                         | ✅ Sim – texturas no solo, glowstone e de reflexo no Pac-Man|
| 📚 **Documentação completa no GitHub (README principal)**                   | ✅ Sim – com descrição, dependências, execução e interação |
