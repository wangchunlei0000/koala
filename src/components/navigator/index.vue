<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentKey = ref(['home'])

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
    </a-menu>
  </div>
</template>
