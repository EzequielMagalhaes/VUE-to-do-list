import taskStore from '../src/store/taskStore';

// Mock do localStorage
beforeEach(() => {
  global.localStorage = {
    storage: {},
    getItem: jest.fn((key) => global.localStorage.storage[key] || null),
    setItem: jest.fn((key, value) => {
      global.localStorage.storage[key] = value;
    }),
    clear: jest.fn(() => {
      global.localStorage.storage = {};
    }),
  };

  // Inicializa o localStorage com uma lista vazia
  localStorage.setItem('tasks', JSON.stringify([]));
});

test('A função "addTask" deve adicionar uma nova task e atualizar o localStorage', () => {
  // Adiciona uma nova tarefa
  taskStore.addTask('New Task');

  // Verifica se a tarefa foi adicionada ao taskStore
  expect(taskStore.tasks).toContainEqual(
    expect.objectContaining({ title: 'New Task' })
  );

  // Verifica se o localStorage foi atualizado corretamente
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'tasks',
    JSON.stringify(taskStore.tasks)
  );

  // Recupera as tarefas do localStorage e valida o conteúdo
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  expect(storedTasks).toContainEqual(
    expect.objectContaining({ title: 'New Task' })
  );
});