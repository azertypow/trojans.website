<template>
  <section class="v-exhibition">

    <a
        class="v-exhibition__link"
        v-if="data.exhibition_link"
        :href="data.exhibition_link"
        target="_blank"
    >
      <div
          class="t-text-subtitle"
      >{{type}}</div>
      <p
          v-if="data.exhibition_title"
      >{{data.exhibition_title}}<template v-if="date">, {{date}}</template></p>
      <p
          v-if="data.partenariat_description"
      >{{data.partenariat_description}}</p>
    </a>



    <template
        v-else
    >
      <div
          class="t-text-subtitle"
      >{{type}}</div>
      <p
          v-if="data.exhibition_title"
      >{{data.exhibition_title}}<template v-if="date">, {{date}}</template></p>
      <p
          v-if="data.partenariat_description"
      >{{data.partenariat_description}}</p>
    </template>

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

  data() {
    return {
      type: this.data.type ||"Exhibition",
      date: this.data.date ? new Date(this.data.date).getFullYear() : null
    }
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/typography";

p {
  @extend .t-text-small;
  margin: 0;
}

.v-exhibition__link {
  display: block;
  text-decoration: none;

  p:last-child:after {
    color: $site-color;
    content: " ↗";
    font-family: 'Inter', Helvetica, Neue, sans-serif;
    position: relative;
  }
}

</style>
