<script setup>
import { ref, onMounted } from 'vue'
import DataBase from '@/util/indexDB.js'

const title = ref('')
const database = ref(null)
const list = ref([])
const add = () => {
  const obj = {
    fileName: `filename=======${title.value}`,
    size: '@@@@@@',
    path: `${title.value}/aa/vv/ccasd/sadas/das/dasdas/dasd/asdas/dasd/asdas`,
  }
  database.value.add(obj)
  console.log('ok')
}
const getAll = () => {
  list.value = database.value.getAll()
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
      <div class="list-item" v-for="{ uuid, fileName, size } in list" :key="uuid">
        {{ fileName }}
        {{ size }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
}
</style>
