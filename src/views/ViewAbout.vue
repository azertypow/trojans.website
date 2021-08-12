<template>
  <section class="v-view-about">
    <toggle-table-fixed
        v-if="about"
        :is-open="getThisTableIsOpen( 0 )"
        :index="0"
        :index-of-open-tab="indexOfToggleTableOpen"
        ref="firstTable"
        @mounted="firstTableMounted"
        @toggled="tableToggled(0, $event)"
        title="About"
        :has-body-container-padding-bottom="false"
    >
      <div
          class="v-view-about__table-content"
          v-html="about.description"
      ></div>
      <div class="v-view-about__table-content__img" >
        <img
            v-for="img of about.images"
            :src="formatUrl(img.url)" alt="">
      </div>
    </toggle-table-fixed>

    <toggle-table-fixed
        v-if="theyWorkWithUs"
        :is-open="getThisTableIsOpen( 1 )"
        :index="1"
        :index-of-open-tab="indexOfToggleTableOpen"
        @toggled="tableToggled(1, $event)"
        title="They Work With Us"
        :has-body-container-padding-bottom="false"
    >
      <div
          class="v-view-about__table-content"
      >
        <div
            class="v-view-about__table-content__item"
            v-for="partner of theyWorkWithUs.partner"
        >
          <a
             :href="partner.url"
             target="_blank"
          >{{ partner.name }}</a>
        </div>
      </div>
    </toggle-table-fixed>

    <toggle-table-fixed
        v-if="exhibitionsAndAwards"
        :is-open="getThisTableIsOpen( 2 )"
        :index="2"
        :index-of-open-tab="indexOfToggleTableOpen"
        @toggled="tableToggled(2, $event)"
        title="Exhibitions and Awards"
        :has-body-container-padding-bottom="false"
    >
      <div
          class="v-view-about__table-content"
      >
        <div
            class="v-view-about__table-content__item"
            v-for="event of exhibitionsAndAwards.events"
        >
          <a
              v-if="event.link"
              :href="event.link"
              target="_blank"
          >
            — {{event.name}} {{event.date}}
            <br>{{event.location}}
          </a>
          <template
              v-else
          >
            — {{event.name}} {{event.date}}
            <br>{{event.location}}
          </template>
        </div>

      </div>
    </toggle-table-fixed>


    <toggle-table-fixed
        v-if="manifesto"
        :is-open="getThisTableIsOpen( 3 )"
        :index="3"
        :index-of-open-tab="indexOfToggleTableOpen"
        @toggled="tableToggled(3, $event)"
        :isGreen="true"
        title="Manifesto"
        :has-body-container-padding-bottom="false"
    >
      <div
          class="v-view-about__table-content"
          v-html="manifesto.description"
      ></div>
      <div class="v-view-about__table-content__img" >
          <img
              v-for="img of manifesto.images"
              :src="formatUrl(img.url)" alt="">
      </div>
    </toggle-table-fixed>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key, State} from "@/store"
import ToggleTable from "@/components/ToggleTable.vue"
import {API_BASE_URL, IApiAbout, IApiExhibitionsAndAwards, IApiManifesto, IApiTheyWorkWithUs} from "@/api"
import ToggleTableFixed from "@/components/ToggleTableFixed.vue"

export default defineComponent({

  name: 'ViewAbout',
  components: {ToggleTableFixed, ToggleTable},

  data() {
    return {
      store: useStore(key),
      indexOfToggleTableOpen: 0,
    }
  },

  methods: {
    firstTableMounted() {
    },

    getThisTableIsOpen(index: number): boolean {
      return this.indexOfToggleTableOpen === index
    },

    tableToggled(index: number, $event: number) {
      this.indexOfToggleTableOpen = index
    },

    formatUrl(path: string) {
      return `${API_BASE_URL}${path}`
    }
  },

  computed: {
    about(): IApiAbout | null {
      return (this.store.state as State).about
    },

    theyWorkWithUs(): IApiTheyWorkWithUs | null {
      return (this.store.state as State).theyWorkWithUs
    },

    exhibitionsAndAwards(): IApiExhibitionsAndAwards | null {
      return (this.store.state as State).award
    },

    manifesto(): IApiManifesto | null {
      return (this.store.state as State).manifesto
    },
  }

});
</script>

<style scoped lang="scss">
@import "../style/param";
@import "../style/grid";

.v-view-about {
  background: white;
  box-sizing: border-box;
  min-height: 100vh;
  transition: background ease-in-out 150ms;

  &.is-dark-bck {
    background: black;
  }
}

.v-view-about__table-content {
  @include gutter;
  padding-top: $gutter / 2;
  padding-bottom: $gutter;
}

.v-view-about__table-content__img {
    width: 100%;

  > img {
    display: block;
    width: 100%;

    + img {
      margin-top: $gutter / 2;
    }
  }
}

.v-view-about__table-content__item {
  padding-bottom: $gutter / 2;

  > a {
    display: block;
    text-decoration: none;

    &:after {
      color: $site-color;
      content: " ↗";
      font-family: 'Inter', Helvetica, Neue, sans-serif;
      top: 3px;
      position: relative;
    }
  }

  &.no-space {
    padding-bottom: 0;
  }
}

.is-desk-width {
  .v-view-about {
    min-height: initial;
  }
}

</style>
