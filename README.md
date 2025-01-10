# Documentação Completa do Projeto To-Do List
## Introdução
Este projeto implementa uma aplicação web para gerenciar tarefas (To-Do List). A interface é responsiva e moderna, permitindo ao usuário adicionar, alternar o status, remover tarefas e obter sugestões a partir de uma API externa. Esta documentação cobre todos os aspectos do projeto, incluindo arquitetura, tecnologias utilizadas e descrição detalhada dos códigos. Ao final,são apresentados os comandos necessários para executar o projeto localmente utilizando Vue e npm, assim como as instruções para criar e rodar a imagem Docker.

## Arquitetura do Projeto
O projeto segue o padrão arquitetural MVVM (Model-View-ViewModel), implementado por meio do Vue.js. Este padrão garante uma clara separação de responsabilidades:
  - Model (taskStore.js): Gerencia os dados e a lógica de negócios, incluindo persistência local e manipulação do estado.
  - View (TaskList.vue e TaskItem.vue): Representa a interface do usuário e exibe as tarefas.
  - ViewModel: Implementado por meio da reatividade do Vue.js, que conecta o Model à View e sincroniza as atualizações de dados automaticamente.

## Tecnologias Utilizadas
### Linguagens e Frameworks
  - Vue.js (versão 3.2.13): Framework JavaScript progressivo utilizado para construir a interface do usuário.
  - Tailwind CSS (versão 3.4.17): Framework CSS utilitário para estilização rápida e responsiva.
  - Vuetify (versão 3.7.6): Biblioteca de componentes Material Design.
  - JavaScript: Linguagem base para a lógica de negócios e manipulação de eventos.

### Gerenciamento de Dependências
- Gerenciado por npm, com dependências descritas no arquivo package.json.

### Ferramentas de Teste
- Jest (versão 29.7.0): Framework de teste para validação das funcionalidades da aplicação.

### API Externa
- JSONPlaceholder: API de exemplo utilizada para buscar sugestões de tarefas.

### Persistência de Dados
- localStorage: Usado para armazenar as tarefas no navegador, garantindo que os dados sejam mantidos após o recarregamento da página.

### Estrutura do Diretório
```
to-do-list/
├── src/
│  ├── components/
│  │  ├── TaskList.vue
│  │  └── TaskItem.vue
│  ├── store/
│  │  └── taskStore.js
│  └── main.js
├── package.json
└── README.md
```
## Descrição dos Arquivos
### TaskList.vue
  - Responsável por renderizar a lista de tarefas.
  - Inclui campos de entrada, botões para adicionar/remover tarefas e uma tabela para exibi-las.
  - Se comunica diretamente com o taskStore para manipular dados.

### TaskItem.vue
  - Representa um item individual da lista de tarefas.
  - Recebe a tarefa como props e emite eventos para alternar o status ou remover a tarefa.

### taskStore.js
  - Gerencia o estado das tarefas, incluindo adição, remoção, alternância de status e persistência no localStorage.
  - Utiliza a API reactive do Vue.js para garantir reatividade.

### main.js
  - Arquivo de entrada que inicializa a aplicação Vue.js e importa os estilos.

### package.json
  - Define as dependências e scripts do projeto.

## Funcionalidades Implementadas
### 1. Adicionar Tarefas
  - Campo de entrada para o usuário digitar o nome da tarefa.
  - Botão "Adicionar" que chama o método addTask.

### 2. Alternar Status
  - Botão para alternar entre "Concluída" e "Pendente" para cada tarefa, utilizando o método toggleTaskCompleted.

### 3. Remover Tarefas
  - Botão de remoção com confirmação para evitar exclusão acidental.

### 4. Sugestão de Tarefa
  - Botão que consome a API JSONPlaceholder e adiciona uma sugestão de tarefa pendente à lista.

### 5. Persistência de Dados
  - Tarefas são salvas no localStorage para garantir que o estado seja mantido após recarregar a página.

### 6. Remoção de Tarefas Concluídas
  - Ao carregar a página, é exibida uma confirmação para remover tarefas marcadas como concluídas.
    
## Fluxo de Execução
### 1. Início da Aplicação:
  - O componente TaskList.vue é renderizado e chama taskStore.loadFromLocalStorage() para carregar tarefas salvas.
  - O método removeCompletedTasks é executado para lidar com tarefas concluídas.

### 2. Adição de Tarefas:
  - Usuário insere o título e clica em "Adicionar".
  - A tarefa é adicionada no taskStore e salva no localStorage.

### 3. Remoção ou Alterar Status:
  - Eventos nos botões interagem com os métodos apropriados no taskStore.
  - A interface é atualizada automaticamente pela reatividade do Vue.js.

## Estilização
  - Tailwind CSS foi utilizado para estilizar os componentes, garantindo responsividade e design moderno.
  - Classes utilitárias facilitam a personalização do espaçamento, cores e bordas.

## Testes
  + Testes foram implementados usando Jest para validar:
    - A adição de tarefas e atualização do localStorage.
    - O comportamento do método toggleTaskCompleted.
    - A remoção de tarefas e persistência no localStorage.

## Conclusão
Este projeto demonstra a implementação de um sistema de gerenciamento de tarefas com base no padrão MVVM, utilizando tecnologias modernas como Vue.js, Tailwind CSS e localStorage. A arquitetura e a separação de responsabilidades tornam o código limpo, reativo e fácil de manter.

## Como executar a imagem docker
#### Executar imagem 
```
docker run -p 8080:8080 ezequielmagalhaes/to-do-list:1.0
```
## Como executar localmente
#### Clonar projeto
```
git clone https://github.com/EzequielMagalhaes/VUE-to-do-list.git
```
#### Organizar setup / instalar dependências
```
npm install
```
#### Compila e executa o projeto
```
npm run serve
```
#### Executa o script de teste
```
npx jest addTask.test.js
```
#### Executa o script de teste adicionando um arquivo de report
```
npx jest addTask.test.js --json --outputFile=./tests/reports/report.json
```
#### Compila e minimiza os arquivos para a etapa de produção
```
npm run build
```
