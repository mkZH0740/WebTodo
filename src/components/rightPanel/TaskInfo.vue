<template>
  <div>
    <div class="desc-panel">
      <el-input rows="4" type="textarea" :disabled="disabled" v-model="task.desc"></el-input>
    </div>
    <div class="task-panel">
      <el-collapse>
        <el-collapse-item v-for="section in task.sections" :key="section.name">
          <div slot="title" :style="{'background-color': getColor(section.progress)}">
            <span class="title-item">{{section.title}}</span>
          </div>
          <div>
            <el-tag v-for="(person, index) in section.people" :key="index" :closable="!disabled" @close="removePerson(index, section.people)">{{person}}</el-tag>
          </div>
          <div v-if="'link' in section">
            <el-link target="_blank" type="primary" :href="section.link">文件链接:</el-link>
            <el-input v-model="section.link" :placeholder="section.link" :disabled="disabled"></el-input>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="choice-panel">
      <el-button type="primary" :disabled="!disabled" @click="disabled=false">编辑</el-button>
      <el-button type="primary" :disabled="disabled" @click="disabled=true">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskInfo",
  props: {
    task: Object
  },
  data () {
    return {
      disabled: true
    }
  },
  methods: {
    removePerson (index, people) {
      people.splice(index, 1)
    },
    getColor (progress) {
      switch (progress) {
        case 0:
          return "white"
        case 1:
          return "yellow"
        case 2:
          return "green"
        case 3:
          return "red"
      }
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
    margin-left:5px;
    background-color:#fff;
    height: 100%
  }
</style>