<template>
  <section class="v-exhibition">
    <div>Exhibition</div>
    <h4>{{data.exhibition_title}}, {{new Date(data.date).getFullYear()}}</h4>
    <p>{{data.partenariat_description}}</p>
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
