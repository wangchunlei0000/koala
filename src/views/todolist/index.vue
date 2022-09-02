<script setup>
import { useTodolist } from '@/stores/todolist.js'
import { storeToRefs } from 'pinia'
import { ref, watch, computed } from 'vue'
const store = useTodolist()
let visible = ref(false)
let title = ref('')
let description = ref('')

const list = computed(() => {
  const { list } = storeToRefs(store)
  return list.value
})

const handleList = () => {
  const doneList = list.value.filter(element => {
    return element.done
  })
  const todoList = list.value.filter(element => {
    return !element.done
  })
  const resultList = todoList.concat(doneList)
  store.resetList(resultList)
}
watch(
  () => list,
  () => {
    handleList()
  },
  {
    deep: true,
  },
)

const showAddList = () => {
  visible.value = true
}

const handleCancel = () => {
  title.value = ''
  description.value = ''
  visible.value = false
}

const handleOk = () => {
  const data = {
    title: title.value,
    description: description.value,
    done: false,
  }
  store.addListItem(data)
  handleCancel()
}
</script>

<template>
  <div class="wrapper">
    <a-button @click="showAddList">ADD</a-button>
    <a-modal
      class="modal-wrapper"
      :visible="visible"
      title="添加 todo"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-input placeholder="输入todo title" v-model:value="title" class="title-input" />
      <a-input placeholder="输入todo description" v-model:value="description" />
    </a-modal>

    <a-list item-layout="horizontal" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              <p>{{ item.title }}</p>
            </template>
            <template #avatar>
              <a-checkbox v-model:checked="item.done"></a-checkbox>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  margin: 50px;
  padding: 50px 100px;
  border: 1px solid #ddd;
  width: 800px;
}
.modal-wrapper {
  padding: 50px;
  .title-input {
    margin-bottom: 20px;
  }
}
</style>
