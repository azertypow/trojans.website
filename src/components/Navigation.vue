<template>
  <nav class="v-navigation">
    <router-link to="/">Home</router-link> |
    <router-link to="/projects">Projects</router-link>
  </nav>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({

  name: 'Navigation',

});
</script>

<style scoped lang="scss">

</style>
