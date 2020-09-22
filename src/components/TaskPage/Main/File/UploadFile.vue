<template>
  <div>
    <el-upload class="upload-file" :action="postUrl" multiple :file-list="fileList">
      <el-button size="small" type="primary" accept=".ass">点击上传</el-button>
    </el-upload>
    <div>
      <el-button type="primary" v-for="(file, index) in fileList" :key="index" @close="navigateFileContent(index)">{{ file.name }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  props: {
    fileList: Array,
    sectionTitle: String
  },
  computed: {
    postUrl () {
      return `${this.$store.state.serverIP}/files?group_id=${this.$store.state.userInfo.groupId}&user_id=${this.$store.state.userInfo.userId}&title=${this.sectionTitle}`
    }
  },
  methods: {
    navigateFileContent (index) {
      console.log(this.fileList[index]);
    }
  }
}
</script>

<style scoped>

</style>