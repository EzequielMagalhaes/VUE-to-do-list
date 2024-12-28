<template>
  <li :class="{ completed: task.completed }">
    <span @click="toggleTask">{{ task.title }}</span>
    <button @click="$emit('remove', task.id)">Remover</button>
  </li>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  methods: {
    toggleTask() {
      this.$emit('toggle', this.task.id);
    },
  },
};
</script>

<style>
li{
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
.completed:hover{
  cursor: pointer;
}
</style>
