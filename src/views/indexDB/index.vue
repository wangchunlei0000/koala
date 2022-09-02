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
    <div class="content">
      <a-input placeholder="输入..." v-model:value="title" class="title-input" />
      <a-button @click="add" class="add-btn">ADD</a-button>
      <a-button @click="getAll" class="get-btn">GETALL</a-button>
      <div class="list-wrapper">
        <div class="list-item" v-for="{ uuid, fileName } in list" :key="uuid">
          <div>{{ uuid }}</div>
          <div>{{ fileName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  margin-top: 50px;
  margin-left: 50px;
  .content {
    width: 500px;
    .title-input {
      margin-bottom: 20px;
    }
    .add-btn {
      margin-right: 20px;
    }
    .list-wrapper {
      margin-top: 50px;
      .list-item {
        margin-bottom: 12px;
      }
    }
  }
}
</style>
