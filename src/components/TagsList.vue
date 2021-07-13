<template>
  <section class="v-tag-list">
    <tag
        v-for="tag of tags"
        :tag='tag.tags'
        :is-seconde-filter="false"
    ></tag>
    <tag
        v-for="secondaryTag of secondaryTags"
        :tag='secondaryTag.value'
        :is-seconde-filter="true"
    ></tag>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key} from "@/store"
import {IApiTags, ISecondTags} from "@/api"
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
    },

    secondaryTags(): ISecondTags[] {
      return this.store.state.secondaryTag
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
