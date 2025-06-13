#  BlogApp: Uma Aplicação de Blog Full-Stack

**Projeto de desenvolvimento web que simula um sistema de blog completo, com funcionalidades de visualização e gerenciamento de postagens e categorias. Desenvolvido com Node.js, Express e MongoDB, e implantado no Railway.**

[![Licença](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-12.10.6-green.svg)]()
[![Status](https://img.shields.io/badge/status-concluído-greend.svg)]()
[![deploy](https://img.shields.io/badge/depoly-inactive-red.svg)]()

## 📌 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)  
2. [Objetivos](#-objetivos)  
3. [Tecnologias](#-tecnologias)  
4. [Funcionalidades](#-funcionalidades)  
5. [Pré-requisitos](#%EF%B8%8F-pré-requisitos)  
6. [Instalação](#%EF%B8%8F-instalação)  
7. [Como utilizar](#-como-utilizar)
8. [Estrutura do Projeto](#-estrutura-do-projeto)
9. [Contribuição](#-contribuição)  
10. [Licença](#-licença)  
11. [Contato](#-contato)  
12. [Recursos Adicionais](#-recursos-adicionais)  

## 💻 Sobre o Projeto

O **BlogApp** é uma aplicação web completa que simula um sistema de blog, desenvolvido com o intuito de demonstrar minhas habilidades e conhecimentos em desenvolvimento **full-stack** utilizando tecnologias modernas do ecossistema JavaScript. O projeto foca em oferecer uma experiência de usuário intuitiva para a leitura e interação com postagens, bem como um painel administrativo robusto para o gerenciamento de conteúdo.

  - *Motivação*: Criar um projeto de portfólio prático que exemplifique o ciclo completo de desenvolvimento de uma aplicação web, desde o front-end responsivo até a persistência de dados no back-end.
  - *Público-alvo*: Potenciais empregadores, clientes, colegas de trabalho e interessados em aplicações de blog desenvolvidas com Node.js e MongoDB.

## 🎯 Objetivos

### 🛠️ Técnicos

  - Desenvolver uma aplicação web **full-stack** utilizando **Node.js** com **Express** para o back-end e **Handlebars.js** para o front-end.
  - Implementar um sistema de autenticação e autorização para usuários e administradores.
  - Gerenciar persistência de dados utilizando **MongoDB** como banco de dados NoSQL.
  - Criar rotas para visualização de conteúdo público e rotas protegidas para gerenciamento administrativo.
  - Assegurar um design responsivo e acessível com **Bootstrap**.

## 🚀 Tecnologias

**Desenvolvimento da Aplicação**

  * HTML5
  * CSS3
  * JavaScript
  * Node.js
  * Express.js 
  * Bootstrap
  * Handlebars.js
  * MongoDB

## ✨ Funcionalidades

  - ✅ **Página Inicial**: Breve descrição do projeto, convite de registro e opções de login.
  - ✅ **Registro de Usuários**: Tela simples para criação de novas contas (email, nome, senha, confirmar senha).
  - ✅ **Login de Usuários**: Tela para acesso à aplicação com email e senha.
  - ✅ **Página Inicial (Pós-Login)**: Após o login, breve descrição do projeto e acesso à visualização de categorias e postagens.
  - ✅ **Visualização de Categorias**: Exibe todas as categorias existentes, permitindo a visualização de postagens por categoria.
  - ✅ **Visualização de Postagens**:
      * **Prévia**: Título, descrição, categoria e data de publicação.
      * **Completa**: Título, descrição, conteúdo, categoria e data de publicação da postagem.
  - ✅ **Rotas Administrativas**: (Acesso restrito para administradores)
      * **Gerenciamento de Categorias**: Adição, edição e deleção de categorias.
      * **Gerenciamento de Postagens**: Adição, edição e deleção de postagens.

## ⚙️ Pré-requisitos

Para rodar este projeto localmente, você precisará ter o seguinte instalado:

  - **Node.js** (versão 14.x ou superior)
  - **npm** (gerenciador de pacotes do Node.js, geralmente vem com o Node.js)
  - **MongoDB** (instalado localmente ou acesso a uma instância do MongoDB Atlas)
  - Conexão estável à internet

## 🛠️ Instalação

Siga os passos abaixo para configurar e rodar o **BlogApp** em sua máquina local:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/lucasgleria/blogapp.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd blogapp
    ```

3.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```

4.  **Crie um arquivo `.env` na raiz do projeto** e configure as variáveis de ambiente necessárias. Você pode usar o exemplo abaixo:

    ```bash
    MONGODB_URI=sua_string_de_conexao_do_mongodb_atlas # Ex: mongodb+srv://usuario:senha@cluster.mongodb.net/blogapp
    PORT=3000 # Ou a porta de sua preferência
    SECRET_KEY=sua_chave_secreta_para_sessao # Uma string aleatória e complexa para segurança da sessão
    ```

      * Substitua `sua_string_de_conexao_do_mongodb_atlas` pela URI de conexão do seu banco de dados MongoDB (local ou Atlas).
      * `SECRET_KEY` é crucial para a segurança das sessões de usuário.

5.  **Inicie a aplicação:**

    ```bash
    npm start
    ```

## ❗ Como Utilizar

Após seguir os passos de instalação e iniciar o projeto:

1.  Acesse a aplicação no seu navegador: `http://localhost:3000` (ou a porta configurada no seu `.env`).
2.  Na **Página Inicial**, você poderá:
      * Visualizar uma breve descrição do projeto.
      * Clicar em "Registro" para criar uma nova conta de usuário.
      * Clicar em "Login" para acessar sua conta existente.
3.  Após o login, você terá acesso à visualização de categorias e postagens.
4.  As **rotas administrativas** são acessíveis apenas para usuários com permissões de administrador, permitindo a criação, edição e exclusão de categorias e postagens.

### ▶️ Demonstração

![Blog](https://c.tenor.com/qZTG-8r8N4kAAAAC/tenor.gif)

_(gif meramente ilustrativo)_
## 📂 Estrutura do Projeto

```plaintext
├── config/             # Configurações do aplicativo (ex: conexão com DB)
├── helpers/            # Verificadores
├── models/             # Definição dos schemas do MongoDB (Mongoose)
├── public/             # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│   ├── js/
│   └── img/
├── routes/             # Definição das rotas da aplicação
├── views/              # Templates Handlebars para renderização das páginas
│   └── admin/
│   ├── categorias/
│   ├── layouts/
│   ├── not-found/
│   ├── partials/
│   ├── postagens/
│   └── usuarios/
├── app.js              # Ponto de entrada da aplicação
├── package.json        # Dependências e scripts do projeto
├── .env.example        # Exemplo de arquivo de variáveis de ambiente
├── .gitignore          # Arquivos e diretórios a serem ignorados pelo Git
├── LICENSE             # Licença MIT
└── README.md           # Este arquivo
```

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tiver sugestões de melhorias ou quiser reportar um bug, sinta-se à vontade para seguir estas etapas:

1.  **Reporte bugs**: Abra uma [issue](https://www.google.com/search?q=https://github.com/lucasgleria/blogapp/issues) no GitHub detalhando o problema encontrado.
2.  **Sugira melhorias**: Envie ideias para novas funcionalidades ou melhorias existentes.
3.  **Desenvolva**:
      * Faça um *fork* do projeto.
      * Crie uma *branch* para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`).
      * Realize suas modificações e *commita* (`git commit -m 'feat: adiciona nova funcionalidade X'`).
      * Envie um *Pull Request* para a *branch* `main` do repositório original.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.

## 📞 Contato & Evidências

 - **Autor**: [Lucas Leria](https://github.com/lucasgleria)  
 - **LinkedIn**: [lucasgleria](https://www.linkedin.com/in/lucasgleria/)  

## 🔍 Recursos Adicionais

  - [Documentação Node.js](https://nodejs.org/en/docs/)
  - [Documentação Express.js](https://expressjs.com/en/4x/api.html)
  - [Documentação Handlebars.js](https://handlebarsjs.com/guide/)
  - [Documentação MongoDB](https://www.mongodb.com/docs/)
  - [Documentação Bootstrap](https://getbootstrap.com/docs/5.3/)
  - [Documentação Railway](https://railway.app/docs/)