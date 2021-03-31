<template>
  <section class="v-gallery">
    <div
        class="v-gallery__header"
    >

    </div>

    <div
        class="v-gallery__body"
    >
      <img
          :alt="data.caption"
          :src="`${API_BASE_URL}${data.formats.large.url}`"
      >
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {API_BASE_URL, IApiImage} from "@/api"

export default defineComponent({

  name: 'Gallery',

  props: {
    data: {
      type: Object as PropType<IApiImage>
    },
  },

  data() {
    return {
      API_BASE_URL,
    }
  },

});
</script>

<style scoped lang="scss">

</style>
