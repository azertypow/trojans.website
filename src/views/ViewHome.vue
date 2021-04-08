<template>
  <section class="v-view-home">
    <div class="first"></div>
    <img src="http://104.248.20.170/uploads/large_DIPLOMES_2020_SCENO_B_Coulon_022_02_36e61875b4.jpg" alt="">
    <img src="http://104.248.20.170/uploads/large_DIPLOMES_202020_SCENO_C2_A9_B_Coulon_007_278e792550.jpg" alt="">
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({

  name: 'ViewHome',

})
</script>

<style scoped lang="scss">
.first {
  width: 100%;
  height: 100vh;
  background: black;
}

img {
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
