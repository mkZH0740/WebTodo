<template>
  <div id="left-panel">
    <div id="task-list-name">
      任务列表
    </div>
    <ul id="task-list">
      <li class="task-list-item" v-for="(task, index) in tasks" :key="index">
        <el-button type="primary" class="item-button" @click="itemSelected(index)">{{task.desc}}</el-button>
      </li>
    </ul>
    <el-button type="primary" class="add-task-button" @click="addTask">创建任务</el-button>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: Array
  },
  methods: {
    itemSelected (index) {
      this.$emit('item-selected', index)
    },
    addTask() {
      this.$emit('add-task')
    }
  }
}
</script>

<style scoped>
  #left-panel {
    position: relative;
    height: 100%;
    vertical-align: center;
  }

  #task-list-name {
    font-size: 25px;
    height: 50px;
    line-height: 50px;

    text-align: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0 10px;
    height: 85%;
  }

  .item-button {
    width: 100%;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  .add-task-button {
    position: absolute;
    bottom: 2%;
    width: 100px;
    left: 100px;
  }
</style>