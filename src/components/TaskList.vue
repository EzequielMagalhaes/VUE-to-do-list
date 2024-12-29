<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center mb-6">To-Do List</h1>

    <!-- Campo de texto e botões -->
    <div class="flex gap-4 mb-6">
      <input
        v-model="newTask"
        type="text"
        placeholder="Adicione uma nova tarefa"
        class="border border-gray-300 rounded-lg p-2 flex-grow"
      />
      <button
        @click="addTask"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Adicionar
      </button>
      <button
        @click="fetchSuggestion"
        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Sugestão de Tarefa
      </button>
    </div>

    <!-- Tabela para exibir as tarefas -->
    <table class="min-w-full border-collapse border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-200 px-4 py-2 text-left">#</th>
          <th class="border border-gray-200 px-4 py-2 text-left">Tarefa</th>
          <th class="border border-gray-200 px-4 py-2 text-center">Status</th>
          <th class="border border-gray-200 px-4 py-2 text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in taskStore.tasks"
          :key="task.id"
          :class="{'bg-green-100': task.completed}"
        >
          <td class="border border-gray-200 px-4 py-2">{{ index + 1 }}</td>
          <td class="border border-gray-200 px-4 py-2">{{ task.title }}</td>
          <td class="border border-gray-200 px-4 py-2 text-center">
            <span
              class="px-2 py-1 rounded-full text-xs"
              :class="{
                'bg-green-500 text-white': task.completed,
                'bg-yellow-500 text-white': !task.completed
              }"
            >
              {{ task.completed ? 'Concluída' : 'Pendente' }}
            </span>
          </td>
          <td class="border border-gray-200 px-4 py-2 text-center">
            <button
              @click="toggleTaskCompleted(task.id)"
              class="bg-yellow-400 text-white px-2 py-1 rounded-lg hover:bg-yellow-500 mr-2"
            >
              Alternar
            </button>
            <button
              @click="confirmAndRemoveTask(task.id)"
              class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
            >
              Remover
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import taskStore from '../store/taskStore';

export default {
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    taskStore() {
      return taskStore;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.taskStore.addTask(this.newTask.trim());
        this.newTask = '';
      }
    },
    confirmAndRemoveTask(id) {
      // Confirmação antes de remover
      const confirmRemoval = confirm('Você tem certeza que deseja remover esta tarefa?');
      if (confirmRemoval) {
        this.taskStore.removeTask(id);
      }
    },
    toggleTaskCompleted(id) {
      this.taskStore.toggleTaskCompleted(id);
    },
    async fetchSuggestion() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();
      const suggestion = todos.find(todo => !todo.completed);
      if (suggestion) {
        this.taskStore.addTask(suggestion.title);
      }
    },
    removeCompletedTasks() {
      const completedTasks = this.taskStore.tasks.filter(task => task.completed);

      if (completedTasks.length > 0) {
        // Exibe um diálogo de confirmação
        const confirmRemoval = confirm(
          'Você tem tarefas concluídas. Deseja removê-las antes de recarregar a página?'
        );

        if (confirmRemoval) {
          // Remove as tarefas concluídas
          this.taskStore.tasks = this.taskStore.tasks.filter(task => !task.completed);
          // Atualiza o localStorage
          this.taskStore.saveToLocalStorage();
        }
      }
    },
  },
  created() {
    // Chama a função para remover tarefas concluídas ao carregar
    this.removeCompletedTasks();
  },
};
</script>