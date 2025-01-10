import { reactive } from 'vue'; // Importa a API reativa do Vue

// Define um objeto reativo para armazenar e gerenciar o estado das tarefas
const taskStore = reactive({
  tasks: [], // Array para armazenar as tarefas
  // Adiciona uma nova tarefa ao array
  addTask(title) {
    const newTask = {
      id: Date.now(),   // Gera um ID único baseado no timestamp
      title,            // Define o título da tarefa
      completed: false, // Inicializa como não concluída
    };
    this.tasks.push(newTask);   // Adiciona ao array de tarefas
    this.saveToLocalStorage();  // Atualiza o localStorage
  },
  // Remove uma tarefa pelo ID
  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id); // Filtra a tarefa a ser removida
    this.saveToLocalStorage();                              // Atualiza o localStorage
  },
  // Alterna o status de concluído de uma tarefa
  toggleTaskCompleted(id) {
    const task = this.tasks.find(task => task.id === id); // Busca a tarefa pelo ID
    if (task) task.completed = !task.completed;           // Alterna o status
    this.saveToLocalStorage();                            // Atualiza o localStorage
  },
  // Carrega as tarefas do localStorage
  loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks'); // Obtém as tarefas salvas
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);            // Atualiza o array de tarefas com os dados armazenados
    }
  },
  // Salva as tarefas no localStorage
  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Converte o array para string e salva
  },
});

// Inicializa carregando as tarefas salvas no localStorage
taskStore.loadFromLocalStorage();
export default taskStore; // Exporta a store para ser usada nos componentes