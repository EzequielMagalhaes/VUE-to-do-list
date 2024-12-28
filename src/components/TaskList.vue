<template>
  <div>
    <input v-model="newTask" placeholder="Adicione uma nova tarefa" />
    <button @click="addTask">Adicionar</button>
    <button @click="fetchSuggestion">Sugestão de Tarefa</button>
    <ul>
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @remove="removeTask"
        @toggle="toggleTaskCompleted"
      />
    </ul>
  </div>
</template>

<script>
import taskStore from '../store/taskStore';
import TaskItem from './TaskItem.vue';

export default {
  components: { TaskItem },
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
    removeTask(id) {
      this.taskStore.removeTask(id);
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
  },
};
</script>

<style scoped>
/* Estilo básico */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
button {
  margin-left: 10px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.completed {
  background-color: #d4edda;
}
</style>