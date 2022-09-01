<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentKey = ref(['home'])

watch(
  () => {
    return route.name
  },
  val => {
    currentKey.value = [val]
  },
)
const changeKey = ({ key }) => {
  currentKey.value = [key]
  router.push({ name: key })
}
</script>

<template>
  <div class="nav-wrapper">
    <a-menu :selectedKeys="currentKey" mode="horizontal" @click="changeKey">
      <a-menu-item key="home"> HOME </a-menu-item>
      <a-sub-menu key="video">
        <template #title>VIDEO</template>
        <a-menu-item-group>
          <a-menu-item key="video1">vue-video-player</a-menu-item>
          <a-menu-item key="video2">xgplayer</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="todolist"> TODOLIST </a-menu-item>
      <a-menu-item key="indexDB"> indexDB </a-menu-item>
    </a-menu>
  </div>
</template>
