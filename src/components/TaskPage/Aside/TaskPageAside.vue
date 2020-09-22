<template>
  <div id="task-list">
    <div class="title">任务列表</div>
    <ul style="list-style: none">
      <li v-for="(task, index) in tasks" :key="index">
        <el-button type="primary" class="task-button" @click="switchTask(index)">{{ task.desc }}</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TaskPageAside",
  props: {
    tasks: Array
  },
  methods: {
    switchTask (index) {
      this.$store.commit('setCurrentTaskIndex', index)
    }
  }
}
</script>

<style scoped>
  #task-list {
    height: 770px;
  }

  .task-button {
    width: 80%;
    height: 50px;
    margin: 10px auto;
  }

  .title {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
    text-align: center;
  }



  ::-webkit-scrollbar-track {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 2px;

    background-color: #fff;
  }
</style>