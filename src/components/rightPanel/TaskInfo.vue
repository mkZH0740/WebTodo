<template>
  <div>
    <div class="desc-panel">
      <el-input rows="4" type="textarea" :disabled="disabled" v-model="task.desc"></el-input>
    </div>
    <div class="task-panel">
      <el-collapse>
        <el-collapse-item v-for="(section, index) in task.sections" :key="index">
          <div slot="title" :style="{'background-color': getColor(section.progress)}">
            <span class="title-item">{{section.title}}</span>
          </div>
          <div>
            <MakeTag :people="section.people" :disabled="disabled"></MakeTag>
          </div>
          <div v-if="'link' in section">
            <el-link target="_blank" type="primary" :href="section.link">文件链接:</el-link>
            <el-input v-model="section.link" :placeholder="section.link" :disabled="disabled"></el-input>
          </div>
          <el-popconfirm title="确认移除吗？" @onConfirm="removeSection(index)">
            <el-button slot="reference" type="danger" :disabled="disabled" class="remove-section-button">删除项目</el-button>
          </el-popconfirm>

        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="choice-panel">
      <el-button type="primary" :disabled="!disabled" @click="disabled=false">编辑</el-button>
      <el-button type="primary" :disabled="disabled" @click="disabled=true">保存</el-button>
      <el-button type="primary" :disabled="disabled" @click="newSectionDialogVisible=true">增加项目</el-button>

      <el-dialog width="50%" v-if="newSectionDialogVisible" title="新项目" :visible.sync="newSectionDialogVisible">
        <NewSection @create-section="createSection"></NewSection>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MakeTag from "@/components/rightPanel/MakeTag";
import NewSection from "@/components/rightPanel/NewSection";
export default {
  name: "TaskInfo",
  components: {NewSection, MakeTag},
  props: {
    task: Object
  },
  data () {
    return {
      disabled: true,
      newSectionDialogVisible: false,
      removeSectionDialogVisible: false
    }
  },
  methods: {
    getColor (progress) {
      switch (progress) {
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
    createSection (newSection) {
      this.task.sections.push(newSection)
      this.newSectionDialogVisible = false
    },
    removeSection(index) {
      this.task.sections.splice(index, 1)
    }
  }
}
</script>

<style scoped>

  .desc-panel {
    margin-bottom: 2%;
  }

  .choice-panel {
    margin-top: 2%;
  }

  .title-item {
    display: inline-block;
    margin-left:8px;
    background-color:#fff;
    height: 100%
  }

  .remove-section-button {
    margin: 5px 0 0;
  }
</style>