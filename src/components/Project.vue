<template>
  <div class="v-projects">
    <h1>{{ data.title }}</h1>
    <div v-html="data.description"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType } from "vue"
import {IProject} from "@/main"

export default defineComponent({
  name: 'Project',
  props: {
    data: {
      type: Object as PropType<IProject>
    },
  },
});
</script>

<style scoped lang="scss">

</style>
