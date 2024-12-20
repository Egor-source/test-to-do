<template>
  <li class="task-item">
    <input
        type="checkbox"
        :id="'checkbox-' + task.id"
        :checked="task.completed"
        @change="toggleCompletion(task)"
    />
    <label :for="'checkbox-' + task.id" class="task-item__label">
      {{ task.text }}
    </label>
    <button @click="deleteTask(task)">Delete</button>
  </li>
</template>

<script>
import axios from "axios";

export default {
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['task-deleted'],
  methods: {
    async toggleCompletion(task) {
      try {
        const updatedTask = {...task, completed: !task.completed};
        const response = await axios.put(
            `http://localhost:3000/api/tasks/${task.id}`,
            updatedTask
        );
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = response.data;
      } catch (error) {
        console.error('Error toggling task completion:', error);
      }
    },
    async deleteTask(task) {
      try {
        await axios.delete(`http://localhost:3000/api/tasks/${task.id}`);
        this.$emit('task-deleted', task.id)
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  }
}
</script>


<style scoped>
.task-item{
  display: flex;
  gap: 10px;
}

.task-item__label{
  cursor: pointer;
}
</style>