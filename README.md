# Interface-Humano-Computador

Este é um protótipo de uma aplicação web para delivery de comida, desenvolvido como parte do projeto da disciplina de Interface Humano-Computador. A aplicação simula a jornada de um usuário, desde o login até a finalização de um pedido.

[](https://www.google.com/search?q=https://rafaelmm16.github.io/Interface-Humano-Computador/)

**[Clique aqui para ver a demonstração ao vivo](https://rafaelmm16.github.io/Interface-Humano-Computador/)**

## ✨ Funcionalidades

  - **Tela de Autenticação:** Uma interface de login e cadastro de novos usuários.
  - **Cardápio Interativo:** Navegação por um cardápio com diferentes categorias de produtos (Massas, Pizzas, Bebidas, etc.).
  - **Pesquisa de Pratos:** Campo de busca para filtrar e encontrar pratos específicos.
  - **Carrinho de Compras:** Funcionalidade para adicionar itens ao carrinho, ajustar quantidades e remover produtos.
  - **Checkout Simplificado:** Uma tela de resumo do pedido com cálculo de subtotal, taxa de entrega e valor total.
  - **Confirmação de Pedido:** Simulação de uma tela de sucesso após a confirmação do pedido.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com tecnologias modernas de desenvolvimento web:

  - **Framework:** [Next.js](https://nextjs.org/) (com App Router)
  - **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
  - **Estilização:**
      - [Tailwind CSS](https://tailwindcss.com/)
      - Componentes construídos com [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) e [Lucide React](https://lucide.dev/) para ícones.
  - **Implantação (Deploy):** Configurado para exportação estática e implantação contínua no [GitHub Pages](https://pages.github.com/) através do [GitHub Actions](https://github.com/features/actions).

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente de desenvolvimento.

**Pré-requisitos:**

  - [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
  - [npm](https://www.npmjs.com/) ou outro gerenciador de pacotes

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/rafaelmm16/Interface-Humano-Computador.git
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd Interface-Humano-Computador/food-app-prop
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

    *Observação: Se encontrar problemas de dependências, pode ser necessário usar `npm install --legacy-peer-deps`.*

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Abra no navegador:**
    Acesse [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.
