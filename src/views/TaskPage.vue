<template>
  <div>
    <TaskPanel></TaskPanel>
  </div>
</template>

<script>
import TaskPanel from "@/components/TaskPage/TaskPanel";
export default {
name: "TaskPage",
  components: {TaskPanel},
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.$store.state.loggedIn){
        vm.$router.replace('/invalid')
      }
    })
  }
}
</script>

<style scoped>

</style>