<template>
  <section class="v-exhibition">
    <div
        class="t-text-subtitle"
    >Exhibition</div>
    <p
        v-if="data.exhibition_title"
    >{{data.exhibition_title}}, {{new Date(data.date).getFullYear()}}</p>
    <p
        v-if="data.partenariat_description"
    >{{data.partenariat_description}}</p>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {IApiExhibition_links} from "../api"

export default defineComponent({

  name: 'Exhibition',

  props: {
    data: {
      type: Object as PropType<IApiExhibition_links>,
      required: true
    },
  },

});
</script>

<style scoped lang="scss">

</style>
