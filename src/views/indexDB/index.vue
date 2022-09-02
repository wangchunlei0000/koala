<script setup>
import { ref, onMounted } from 'vue'
import DataBase from '@/util/indexDB.js'

const title = ref('')
const database = ref(null)
const list = ref([])
const add = () => {
  const obj = {
    fileName: `name=======${title.value}`,
  }
  database.value.add(obj)
}
const getAll = async () => {
  list.value = await database.value.getAll()
}
onMounted(() => {
  database.value = new DataBase('WANG')
})
</script>

<template>
  <div class="wrapper">
    <a-input placeholder="输入..." v-model:value="title" class="title-input" />
    <a-button @click="add">ADD</a-button>
    <a-button @click="getAll">GETALL</a-button>

    <div class="list-wrapper">
      <div class="list-item" v-for="{ uuid, fileName } in list" :key="uuid">
        {{ uuid }}
        {{ fileName }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
}
</style>
