<template>
  <div>
    <el-link :href="link" target="_blank" type="primary">文件链接：{{link}}</el-link>
    <el-input v-model="link" :placeholder="link" :disabled="!editing"></el-input>
  </div>
</template>

<script>
export default {
  name: "UploadLink",
  props: {
    link: String,
    editing: Boolean
  }
}
</script>

<style scoped>

</style>