<template>
  <el-container class="main-panel">
    <el-header height="100px" style="padding: 0">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="300px" class="left-panel">
        <TaskList :tasks="tasks" @item-selected="switchTask" @add-task="addTask"></TaskList>
      </el-aside>
      <el-main class="right-panel">
        <TaskInfo v-if="tasks.length > 0" :task="tasks[currentIndex]"></TaskInfo>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Axios from 'axios'
import Header from "@/components/header/Header";
import TaskList from "@/components/leftPanel/TaskList";
import TaskInfo from "@/components/rightPanel/TaskInfo";

export default {
  name: "HomePage",
  components: {TaskInfo, TaskList, Header},
  data () {
    return {
      tasks: [],
      currentIndex: 0,
      group_id: ''
    }
  },
  methods: {
    switchTask (index) {
      this.currentIndex = index
    },
    addTask(){
      this.tasks.push({
        desc: "新任务",
        sections: []
      })
    }
  },
  beforeCreate () {
    Axios.get(`http://localhost:8000/tasks?group_key=${this.$route.query.group_key}`).then(res => {
      this.tasks = res.data.tasks
      this.$store.state.group_id = res.data.group_id
    })
  }
}
</script>

<style scoped>
  .main-panel {
    width: 80%;
    height: 1000px;

    margin: auto;
  }

  .left-panel {
    margin-top: 20px;
    width: 30%;
    height: 90%;
  }

  .right-panel {
    margin-top: 20px;
    margin-left: 3%;
    width: 30%;
    height: 90%;
  }
</style>