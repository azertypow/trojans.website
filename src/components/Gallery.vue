<template>
    <img
        class="v-gallery"
        :alt="data.caption"
        :src="largeImgUrl"
    >
  <div
      v-if="data.caption"
  >
    {{data.caption}}
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {API_BASE_URL, IApiImage} from "@/api"

export default defineComponent({

  name: 'Gallery',

  props: {
    data: {
      required: true,
      type: Object as PropType<IApiImage>,
    },
  },

  computed: {
    largeImgUrl(): string {
      const largeImagePath: string = this.data.formats?.large?.url || this.data.url || ""
      return `${API_BASE_URL}${largeImagePath}`
    },
  }

});
</script>

<style scoped lang="scss">
.v-gallery {
  display: block;
  width: 100%;
  height: auto;
}
</style>
