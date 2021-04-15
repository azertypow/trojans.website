<template>
  <section class="v-view-home">
    <div class="v-view-home__img-intro">
      <div>
        <img class="v-view-home__logo" src="../style/images/TrojansLogo--white.svg" alt="Trojan logo">
      </div>
      <div></div>
    </div>
    <img src="http://104.248.20.170/uploads/large_DIPLOMES_2020_SCENO_B_Coulon_022_02_36e61875b4.jpg" alt="">
    <img src="http://104.248.20.170/uploads/large_58616620_2415110408541529_5371995371276861440_n_3d603d97c7.jpg" alt="">
  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"

export default defineComponent({

  name: 'ViewHome',

})
</script>

<style scoped lang="scss">
.v-view-home__img-intro {
  width: 100%;
  height: 100vh;
  background: black;
  padding: 50px;
  box-sizing: border-box;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    position: fixed;
    top: 0;
    left: 0;
  }
}

img {
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
</style>
