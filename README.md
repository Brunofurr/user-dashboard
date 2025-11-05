# User Dashboard

Dashboard de gerenciamento de usuários desenvolvido em Angular 20 com gerenciamento de estado usando NgRx.

## Tecnologias

- **Angular 20.3.9** - Framework principal
- **TypeScript 5.9.2** - Linguagem de programação
- **NgRx 20.1.0** - Gerenciamento de estado (Store, Effects, Entity, Router Store, DevTools)
- **RxJS 7.8.0** - Programação reativa
- **SCSS** - Pré-processador CSS
- **Jasmine + Karma** - Testes unitários
- **Cypress 15.6.0** - Testes end-to-end

## Funcionalidades

- Listagem de usuários consumindo API externa (JSONPlaceholder)
- Busca e filtragem de usuários por nome, email ou empresa
- Visualização detalhada de informações do usuário
- Tema claro/escuro com persistência em localStorage
- Design responsivo para mobile e desktop
- Tratamento de erros e estados de carregamento

## Arquitetura

### Standalone Components
O projeto utiliza a arquitetura de standalone components do Angular, eliminando a necessidade de módulos e permitindo maior modularidade e lazy loading otimizado.

### Gerenciamento de Estado com NgRx
Implementação completa do padrão Redux através do NgRx

### HTTP Interceptors
Implementação de interceptors

- **Headers Interceptor**: Adiciona headers padrão às requisições
- **Logging Interceptor**: Registra requisições e respostas para debug
- **Error Interceptor**: Tratamento centralizado de erros HTTP

## Instalação

```bash
npm install
```

## Execução

### Ambiente de Desenvolvimento
```bash
npm start
```
Acesse `http://localhost:4200/`

### Build de Produção
```bash
npm run build
```

## Testes

### Testes Unitários
```bash
npm test
```

Executa os testes unitários usando Karma e Jasmine com cobertura de código.

### Testes End-to-End

#### Interface interativa
```bash
npm run cypress:open
```

#### Modo headless
```bash
npm run cypress:run
```

#### CI/CD
```bash
npm run cypress:ci
```

#### Scripts

- `npm start` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm test` - Executa testes unitários
- `npm run watch` - Build em modo watch
- `npm run e2e` - Executa testes E2E
- `npm run cypress:open` - Abre interface do Cypress
- `npm run cypress:run` - Executa testes Cypress em headless
- `npm run cypress:ci` - Executa testes em ambiente CI

## Requisitos do Sistema

- Node.js: ^20.19.0 || ^22.12.0 || >=24.0.0
- npm: ^6.11.0 || ^7.5.6 || >=8.0.0