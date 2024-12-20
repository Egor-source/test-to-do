<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTaskText" placeholder="New task" required/>
      <button type="submit">Add Task</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <TaskItem :task="task" @task-deleted="taskDeleted"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import TaskItem from "@/components/TaskItem.vue";

export default {
  components: {TaskItem},
  data() {
    return {
      tasks: [],
      newTaskText: '',
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      try {
        const response = await axios.post('http://localhost:3000/api/tasks', {
          text: this.newTaskText,
        });
        this.tasks.push(response.data);
        this.newTaskText = '';
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    taskDeleted(taskId) {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
  },
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}
</style>
