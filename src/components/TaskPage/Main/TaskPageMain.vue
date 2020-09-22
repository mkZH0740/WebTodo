<template>
  <div>
    <div class="task-info">
      <el-input autosize type="textarea" v-model="task.desc" class="task-desc" :disabled="!editing" resize="none"></el-input>
      <el-collapse>
        <el-collapse-item v-for="(section, index) in task.sections" :key="index" :name="section.title" :title="section.title">
          <!--        title and color indicator-->
          <div slot="title" :style="{'background-color': getColor(section.progress)}">
            <span class="title-item">{{section.title}}</span>
          </div>
          <!--        display responsible people-->
          <div class="collapse-item">
            <People :editing="editing" :people="section.people"></People>
          </div>
          <!--        display section file link-->
          <div v-if="'link' in section" class="collapse-item">
            <UploadLink :editing="editing" :link="section.link"></UploadLink>
          </div>
          <!--        display file -->
          <div v-if="'files' in section" class="collapse-item">
            <UploadFile :file-list="section.files" :editing="editing"></UploadFile>
          </div>

          <!--        remove section button-->
          <div class="collapse-item">
            <el-popconfirm title="确认移除吗？" @onConfirm="removeSection(index)">
              <el-button slot="reference" type="danger" :disabled="!editing" class="remove-section-button">删除项目</el-button>
            </el-popconfirm>
          </div>

        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="choice-panel">
      <el-button type="primary" :disabled="editing" @click="editing=true">编辑</el-button>
      <el-button type="primary" :disabled="!editing" @click="editing=false">保存</el-button>
      <el-button type="primary" :disabled="!editing" @click="newSectionVisible=true">增加项目</el-button>

      <NewSection v-if="newSectionVisible" @create-section="createSection" @close="newSectionVisible=false"></NewSection>
    </div>
  </div>
</template>

<script>
import People from "@/components/TaskPage/Main/People/People";
import UploadLink from "@/components/TaskPage/Main/Link/UploadLink";
import NewSection from "@/components/TaskPage/Main/NewSection/NewSection";
import UploadFile from "@/components/TaskPage/Main/File/UploadFile";

export default {
  name: "TaskPageMain",
  components: {UploadLink, UploadFile, NewSection, People},
  props: {
    task: Object
  },
  data () {
    return {
      editing: false,
      newSectionVisible: false
    }
  },
  methods: {
    getColor (progress) {
      switch (progress){
        case 0:
          return "#909399"
        case 1:
          return "#E6A23C"
        case 2:
          return "#67C23A"
        case 3:
          return "#F56C6C"
      }
    },
    removeSection (index) {
      this.task.sections.splice(index, 1)
    },
    createSection (newSection) {
      this.newSectionVisible = false
      this.task.sections.push(newSection)
    }
  }
}
</script>

<style scoped>
  .collapse-item {
    margin: 5px 10px;
  }

  .task-desc {
    margin-bottom: 10px;
  }

  .task-info {
    margin-bottom: 10px;
  }

  .title-item {
    display: inline-block;
    margin-left:8px;
    height: 100%;
    background-color:#fff;
  }

  .task-info::-webkit-scrollbar-track {
    width: 4px;
  }

  .task-info::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 2px;

    background-color: #fff;
  }
</style>