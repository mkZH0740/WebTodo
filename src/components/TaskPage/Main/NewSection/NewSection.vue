<template>
  <div>
    <el-dialog width="50%" title="新项目" :visible="true" @close="closeCreateSection">
      <div>
        <el-input v-model="form.title" placeholder="请输入项目名称"></el-input>
      </div>

      <div>
        <el-switch v-model="hasLink" active-text="有链接" inactive-text="无链接"></el-switch>
        <el-switch v-model="hasFile" active-text="有ass文件" inactive-text="无ass文件"></el-switch>
      </div>

      <el-button type="primary" @click="createSection">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NewSection",
  data () {
    return {
      hasLink: false,
      hasFile: false,
      form: {
        title: '',
        people: [],
        progress: 0
      }
    }
  },
  methods: {
    createSection () {
      if (this.hasLink) {
        this.form["link"] = ''
      }
      if (this.hasFile) {
        this.form["files"] = []
      }
      this.$emit('create-section', this.form)
    },
    closeCreateSection () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>