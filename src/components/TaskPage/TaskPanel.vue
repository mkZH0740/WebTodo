<template>
  <div id="task-panel-wrapper">
    <el-container>
      <el-header height="80px">
        <TaskPageHeader></TaskPageHeader>
      </el-header>
      <el-container>
        <el-aside style="padding: 20px;">
          <TaskPageAside :tasks="$store.state.tasks"></TaskPageAside>
        </el-aside>
        <el-main style="height: 810px">
          <TaskPageMain v-if="$store.state.tasks.length > 0" :task="$store.state.tasks[$store.state.currentTaskIndex]"></TaskPageMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TaskPageHeader from "@/components/TaskPage/Header/TaskPageHeader";
import TaskPageAside from "@/components/TaskPage/Aside/TaskPageAside";
import TaskPageMain from "@/components/TaskPage/Main/TaskPageMain";
export default {
  name: "TaskPanel",
  components: {TaskPageMain, TaskPageAside, TaskPageHeader},
  beforeCreate() {
    this.$store.dispatch('getTasks')
  }
}
</script>

<style scoped>
  #task-panel-wrapper {
    height: 900px;
    width: 1500px;
    margin: auto;
    padding: 10px;

    background-color: rgba(0, 0, 0, .1);
  }
</style>