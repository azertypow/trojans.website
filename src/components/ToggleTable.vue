<template>
  <section class="v-toggle-table">

    <div class="v-toggle-table__title">
      <slot name="title"></slot>
    </div>

    <div>
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({

  name: 'ToggleTable',

});
</script>

<style scoped lang="scss">

</style>
