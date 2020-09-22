<template>
  <div>
    <div class="file-list">
      <el-button type="primary" v-for="(file, index) in currentFileList" :key="index" @click="navigateFileContent(file.name)">{{ file.name }}</el-button>
    </div>
    <div>
      <el-upload v-if="editing" class="upload-file" :action="postUrl" multiple :file-list="fileList" accept=".ass" :on-success="fileUploaded">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-dialog title="轴文件内容" :visible.sync="contentVisible" width="1000px">
        <div class="content-panel">
          <el-table :data="currentFileContent" height="600px">
            <el-table-column property="start_time" label="开始时间" width="100px"></el-table-column>
            <el-table-column property="end_time" label="结束时间" width="100px"></el-table-column>
            <el-table-column property="style" label="样式" width="100px"></el-table-column>
            <el-table-column property="text" label="文本" width="200px"></el-table-column>
            <el-table-column label="PR" width="">
              <div slot-scope="scope">
                <el-input v-model="scope.row.comment" :disabled="!editing"></el-input>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button type="primary" :disabled="contentEditing" @click="contentEditing=true">编辑</el-button>
          <el-button type="primary" :disabled="!contentEditing" @click="contentEditing=false">保存</el-button>
          <el-button type="primary" :disabled="!contentEditing" @click="contentEditing=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import { Notification } from 'element-ui'

export default {
  name: "UploadFile",
  props: {
    fileList: Array,
    sectionTitle: String,
    editing: Boolean
  },
  data () {
    return {
      currentFileList: this.fileList,
      currentFileContent: [],
      contentVisible: false,
      contentEditing: false
    }
  },
  computed: {
    postUrl () {
      return `${this.$store.state.serverIP}/files?group_id=${this.$store.state.userInfo.groupId}&user_id=${this.$store.state.userInfo.userId}&title=${this.sectionTitle}`
    }
  },
  methods: {
    navigateFileContent (filename) {
      Axios.get(`${this.$store.state.serverIP}/files?filename=${filename}`).then(res => {
        this.currentFileContent = res.data.content
        this.contentVisible = true
      }).catch(() => {
        Notification.error({
          title: '错误！',
          message: '网络错误，获取文件内容失败'
        })
      })
    },
    fileUploaded (response, file) {
      this.currentFileList.push(file)
      this.fileList.push(file)
    }
  }
}
</script>

<style scoped>
  .file-list {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .content-panel {
    height: 700px;
  }
</style>