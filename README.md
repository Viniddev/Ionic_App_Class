# EasyOrder: Gestão simplificada de comanda digital.

![Badge Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)
![Ionic](https://img.shields.io/badge/Ionic-%3E%3D%206.0-blue)
![Angular](https://img.shields.io/badge/Angular-%3E%3D%2015.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Authentication%20%26%20Database-orange)
![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Este projeto está sendo desenvolvido com o objetivo de criar um aplicativo mobile moderno e escalável para gestão de comanda digital em restaurantes e bares. Durante o desenvolvimento, estamos utilizando tecnologias robustas para garantir uma experiência de usuário fluida e intuitiva. O aplicativo é baseado no **Ionic**, **Angular** e **TypeScript**, e utiliza o **Firebase** para autenticação e persistência de dados.

## 📋 Índice

- [Sobre o Projeto](##sobre-o-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## 🚀 Sobre o Projeto

Este projeto é um aplicativo mobile desenvolvido utilizando o framework **Ionic** junto com **Angular** e **TypeScript**. O objetivo principal é criar um app de alto desempenho e design moderno, utilizando **Firebase** para gerenciamento de autenticação e banco de dados em tempo real.

A aplicação faz uso do **Ionic Framework** para fornecer uma UI responsiva e adaptável a diferentes dispositivos. O **Firebase Authentication** é utilizado para login seguro, e o **Cloud Firestore** para armazenamento e sincronização de dados em tempo real.

## 🛠 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Git](https://git-scm.com/) (necessário para controle de versão)
- [WSL](https://www.youtube.com/watch?v=o1_E4PBl30s) (recomendado, especialmente no Windows)
- Editor de código, como [Visual Studio Code](https://code.visualstudio.com/)
- [Ionic CLI](https://ionicframework.com/docs/cli) (para gerenciamento do projeto Ionic)
- [Angular CLI](https://angular.io/cli) (para desenvolvimento em Angular)
- Conta no [Firebase](https://firebase.google.com/) para autenticação e banco de dados

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Viniddev/mobile_app.git
   ```

2. Instale o **Ionic CLI** e **Angular CLI** globalmente:
   ```bash
   npm install -g @ionic/cli
   npm install -g @angular/cli
   ```

3. Entre na pasta do projeto e instale as dependências:
   ```bash
   cd mobile_app
   npm install
   ```

4. Configure as credenciais do Firebase:
   - Acesse o [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto e adicione um app web
   - Copie a configuração do Firebase e insira no arquivo `src/environments/environment.ts`

5. Inicie o servidor de desenvolvimento:
   ```bash
   ionic serve
   ```

## 📦 Estrutura do Projeto

1. Criação da estrutura do Ionic + Angular:
   ```bash
   ionic start ionic_app blank --type=angular
   ```

2. Adicionando Firebase ao projeto:
   ```bash
   npm install firebase @angular/fire
   ```

3. Rodando o aplicativo em um emulador ou dispositivo:
   ```bash
   ionic capacitor add android
   ionic capacitor add ios
   ionic capacitor run android
   ```

Caso esteja utilizando um dispositivo físico, é necessário ativar a **Depuração USB**.

---

## 🚀 Tecnologias Utilizadas

- **Ionic Framework**: Framework para desenvolvimento híbrido
- **Angular**: Framework baseado em TypeScript para construção do front-end
- **Firebase**: Plataforma para autenticação e banco de dados em tempo real
- **TypeScript**: Superset do JavaScript para tipagem estática

## 🤝 Contribuição

Sinta-se à vontade para contribuir com o projeto! Para isso:

1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b minha-feature`)
3. Faça as mudanças necessárias
4. Commit suas alterações (`git commit -m 'Adicionando nova funcionalidade'`)
5. Faça um push para a branch (`git push origin minha-feature`)
6. Abra um Pull Request

## 📜 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

Caso tenha dúvidas ou sugestões, entre em contato:

- **E-mail**: diasvinicius95@outlook.com
- **LinkedIn**: [linkedin.com/in/vinicius-dias-rodrigues/](https://www.linkedin.com/in/vinicius-dias-rodrigues/)

---

Desenvolvido com ❤️ por Vinícius, Gentil e Camily 🚀

