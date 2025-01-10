<!-- VIEW -->
<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-6">To-Do List</h1>
    <div class="flex gap-4 mb-6">
      <!-- Campo de texto para inserir uma nova tarefa -->
      <input v-model="newTask" type="text" placeholder="Adicione uma nova tarefa" class="border border-gray-300 rounded-lg p-2 flex-grow"/>
      <!-- Botão para adicionar uma nova tarefa -->
      <button @click="addTask" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Adicionar</button>
      <!-- Botão para buscar uma sugestão de tarefa via API -->
      <button @click="fetchSuggestion" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Sugestão de Tarefa</button>
    </div>

    <!-- Tabela para exibir as tarefas -->
    <table class="min-w-full border-collapse border border-gray-200">
      <!-- Cabeçalho da tabela -->
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-200 px-4 py-2 text-left">#</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Tarefa</th>
          <th class="border border-gray-200 px-4 py-2 text-center">Status</th>
          <th class="border border-gray-200 px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      
      <!-- Corpo da tabela -->
      <tbody>
        <!-- Laço para exibir cada tarefa dinamicamente -->
        <tr v-for="(task, index) in taskStore.tasks" :key="task.id" :class="{'bg-green-100': task.completed}">
          <!-- Coluna com o índice da tarefa -->
          <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
          <!-- Coluna com o título da tarefa -->
          <td class="border border-gray-200 px-4 py-2">{{ task.title }}</td>
          <!-- Coluna com o status da tarefa -->
          <td class="border border-gray-200 px-4 py-2 text-center">
            <span class="px-2 py-1 rounded-full text-xs" :class="{'bg-green-500 text-white': task.completed,'bg-yellow-500 text-white': !task.completed}">
              {{ task.completed ? 'Concluída' : 'Pendente' }} <!-- Operador ternário para verificar se está concluido ou pendente -->
            </span>
          </td>
          
          <!-- Coluna com ações: alternar status ou remover tarefa -->
          <td class="border border-gray-200 px-4 py-2 text-center">
            <!-- Botão para alternar o status de conclusão -->
            <button @click="toggleTaskCompleted(task.id)" class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500 mr-2">Alternar</button>
            <!-- Botão para remover a tarefa -->
            <button @click="confirmAndRemoveTask(task.id)" class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// Importa a store centralizada para gerenciar as tarefas
import taskStore from '../store/taskStore';
export default {
  // Propriedades reativas da instância
  data() {
    return {
      newTask: '', // Armazena o valor do campo de texto para adicionar uma nova tarefa
    };
  },
  // Computed properties para acessar a store
  computed: {
    taskStore() {
      return taskStore;
    },
  },
  methods: {
    // Adiciona uma nova tarefa à lista
    addTask() {
      if (this.newTask.trim()) {
        this.taskStore.addTask(this.newTask.trim());
        this.newTask = ''; // Reseta o campo de texto
      }
    },
    // Exibe confirmação antes de remover uma tarefa
    confirmAndRemoveTask(id) {
      const confirmRemoval = confirm('Você tem certeza que deseja remover esta tarefa?');
      if (confirmRemoval) {
        this.taskStore.removeTask(id);
      }
    },
    // Alterna o status de uma tarefa entre concluída e pendente
    toggleTaskCompleted(id) {
      this.taskStore.toggleTaskCompleted(id);
    },
    // Busca uma sugestão de tarefa a partir de uma API pública
    async fetchSuggestion() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();
      const suggestion = todos.find(todo => !todo.completed);
      if (suggestion) {
        this.taskStore.addTask(suggestion.title);
      }
    },
    // Remove tarefas concluídas após confirmação
    removeCompletedTasks() {
      const completedTasks = this.taskStore.tasks.filter(task => task.completed);
      if (completedTasks.length > 0) {
        const confirmRemoval = confirm('Você tem tarefas concluídas. Deseja removê-las antes de recarregar a página?');
        if (confirmRemoval) {
          this.taskStore.tasks = this.taskStore.tasks.filter(task => !task.completed);
          this.taskStore.saveToLocalStorage();
        }
      }
    },
  },
  // Hook do ciclo de vida que executa ao criar o componente
  created() {
    this.removeCompletedTasks();
  },
};
</script>