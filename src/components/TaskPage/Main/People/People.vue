<template>
  <div class="people-tags">
    <el-tag v-for="(person, index) in people" :key="index" :closable="editing" @close="removePerson(index)">{{person}}</el-tag>
    <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="newPerson"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleNewPerson"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput" :disabled="!editing">+ 增加</el-button>
  </div>
</template>

<script>
export default {
  name: "People",
  props: {
    people: Array,
    editing: Boolean
  },
  data () {
    return {
      inputVisible: false,
      newPerson: ''
    }
  },
  methods: {
    removePerson (index) {
      this.people.splice(index, 1)
    },
    showInput () {
      this.inputVisible = true
    },
    handleNewPerson () {
      this.people.push(this.newPerson)
      this.newPerson = ''
      this.inputVisible = false
    }
  }
}
</script>

<style scoped>
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>