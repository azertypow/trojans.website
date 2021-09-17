<template>
  <div class="v-mail-chimp">

    <p
        class="t-text-subtitle"
    >Subscribe to our newsletter</p>

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
            placeholder="Enter your email"
        />

        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
                                                                                  name="b_9347e7db75c68142d55f52ba1_acbe94976e"
                                                                                  tabindex="-1" value=""></div>
      <input type="submit"
             value="Subscribe"
             name="subscribe"/>
    </form>

    <div>
      <div class="t-close"
           @click="closeThis"
      ></div>
    </div>

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

  methods: {
    closeThis() {
      this.store.commit("updateNewsletterOpen", false)
    },
  }

});
</script>

<style lang="scss" scoped>
@import "../style/param";
@import "../style/typography";

.v-mail-chimp {
  display: flex;
  background: $site-background-color;
  align-items: center;
  justify-content: right;
  box-shadow: $tile-box-shadow;
  padding-top: ($gutter / 2);

  > * {
    padding: 0 ($gutter / 2);
  }

  transition: background $page-transition--duration $page-transition--timing-function;

  .is-home & {
    background: transparent;
    box-shadow: none;
  }
}

.t-text-subtitle {
  margin: 0;
}

form {
  display: flex;
  align-items: center;

  input {
    @extend .t-text-small;
    color: inherit;
    display: block;
    border: solid 1px black;
    line-height: 20px;
    padding: $gutter / 4;
    box-sizing: border-box;
    margin: 0;
    &::placeholder {
      color: inherit;
    }

    &[type='submit'] {
      background: black;
      color: $site-background-color;
      cursor: pointer;
    }

    &[type='email'] {
      background: white;
    }
  }
}
</style>
