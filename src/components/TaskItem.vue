<template>
  <!-- Item de uma tarefa na lista -->
  <li :class="{ completed: task.completed }" class="flex items-center justify-between p-2 border-b">
    <!-- Texto da tarefa -->
    <span @click="toggleTask" class="cursor-pointer">{{ task.title }}</span>
    <!-- Botão para remover a tarefa -->
    <button @click="$emit('remove', task.id)" class="text-red-500 hover:underline">Remover</button>
  </li>
</template>

<script>
export default {
  // Propriedades recebidas do componente pai
  props: {
    task: Object, // Cada tarefa é passada como um objeto
  },
  methods: {
    toggleTask() {
      // Emite um evento para alternar o status de concluído
      this.$emit('toggle', this.task.id);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through; /* Riscado se a tarefa estiver concluída */
  color: gray;
}
</style>
