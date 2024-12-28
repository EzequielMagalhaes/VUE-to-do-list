import { reactive } from 'vue';

const taskStore = reactive({
  tasks: [],

  addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.saveToLocalStorage();
  },

  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToLocalStorage();
  },

  toggleTaskCompleted(id) {
    const task = this.tasks.find(task => task.id === id);
    if (task) task.completed = !task.completed;
    this.saveToLocalStorage();
  },

  loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  },

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  },
});

taskStore.loadFromLocalStorage();

export default taskStore;