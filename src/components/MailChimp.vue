<template>
  <div class="v-mail-chimp">

    <form
        action="https://trojanscollective.us7.list-manage.com/subscribe/post?u=9347e7db75c68142d55f52ba1&amp;id=acbe94976e"
        method="post"
        name="mc-embedded-subscribe-form"
        novalidate
    >
        <input
            type="email"
            value=""
            name="EMAIL"
            placeholder="Subscribe to our newsletter"
            size="25"
        />

        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
                                                                                  name="b_9347e7db75c68142d55f52ba1_acbe94976e"
                                                                                  tabindex="-1" value=""></div>
      <input type="submit"
             value="-->"
             name="subscribe"/>
    </form>

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

.v-mail-chimp {
  display: flex;
  align-items: center;
  justify-content: left;

  > * {
    padding: 0 ($gutter / 2);
  }
}

.t-text-subtitle {
  margin: 0;
}

form {
  display: flex;
  align-items: center;

  input {
    all: unset;
    @extend .t-text-small;
    color: $site-color;
    display: block;
    line-height: 20px;
    padding: 0;
    box-sizing: border-box;
    margin: 0;
    &::placeholder {
      color: inherit;
    }

    &[type='submit'] {
      font-family: 'Inter', Helvetica, Neue, sans-serif;
      cursor: pointer;
    }
  }
}
</style>
