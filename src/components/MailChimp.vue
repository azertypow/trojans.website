<template>
  <div class="v-mail-chimp">
    <a
        target="_blank"
       href="https://trojanscollective.us7.list-manage.com/subscribe/post?u=9347e7db75c68142d55f52ba1&amp;id=acbe94976e"
    >Subscribe to our newsletter <span>--></span></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useStore} from "vuex"
import {key} from "@/store"

export default defineComponent({
  name: 'MailChimp',
  components: {
  },

  data() {
    return {
      store: useStore(key)
    }
  },

});
</script>

<style lang="scss" scoped>
@import "../style/param";
@import "../style/typography";
.t-text-subtitle {
  margin: 0;
}

.v-mail-chimp {

  a {
    all: unset;
    @extend .t-text-small;
    color: $site-color;
    display: block;
    line-height: 20px;
    padding: $gutter / 2;
    box-sizing: border-box;
    margin: 0;
    cursor: pointer;

    span {
      font-family: 'Inter', Helvetica, Neue, sans-serif;
    }

    &:after {
      content: none;
    }
  }
}
</style>
