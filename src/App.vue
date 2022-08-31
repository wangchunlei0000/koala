<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/video">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="less" scoped>
.wrapper {
  background-color: antiquewhite;
}
</style>
