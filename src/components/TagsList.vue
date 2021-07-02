<template>
  <section class="v-tag-list">
    <tag
        v-for="tag of tags"
        :tag='tag.tags'
    ></tag>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiTags} from "@/api"
import Tag from "@/components/Tag.vue"

export default defineComponent({

  name: 'TagsList',
  components: {Tag},
  data() {
    return {
      store: useStore(key)
    }
  },

  computed: {
    tags(): IApiTags[] {
      return this.store.state.tags
    }
  }

})
;
</script>

<style lang="scss">
.v-tag-list {
  display: flex;
}
</style>
