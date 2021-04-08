<template>
  <section class="v-view-about">
    <toggle-table
        v-if="about"
        :is-open="getThisTableIsOpen( 0 )"
        ref="firstTable"
        @mounted="firstTableMounted"
        @toggled="tableToggled(0, $event)"
        title="About"
    >
      <div
          class="v-view-about__table-content"
          v-html="about.description"
      ></div>
    </toggle-table>

    <toggle-table
        v-if="theyWorkWithUs"
        :is-open="getThisTableIsOpen( 1 )"
        @toggled="tableToggled(1, $event)"
        title="They Work With Us"
    >
      <div
          class="v-view-about__table-content"
      >
        <a v-for="partner of theyWorkWithUs.partner"
           :href="partner.url"
           target="_blank"
        >{{ partner.name }}</a>
      </div>
    </toggle-table>

    <toggle-table
        v-if="exhibitionsAndAwards"
        :is-open="getThisTableIsOpen( 2 )"
        @toggled="tableToggled(2, $event)"
        title="Exhibitions and Awards"
    >
      <div
          class="v-view-about__table-content"
      >
        <div
            class="v-view-about__table-content__item"
            v-for="event of exhibitionsAndAwards.events"
        >
          — {{event.name}} {{event.date}}
          <br>{{event.location}}
        </div>

      </div>
    </toggle-table>


    <toggle-table
        v-if="manifesto"
        :is-open="getThisTableIsOpen( 3 )"
        @toggled="tableToggled(3, $event)"
        :is-dark="true"
        title="Manifesto"
    >
      <div
          class="v-view-about__table-content"
          v-html="manifesto.description"
      ></div>
    </toggle-table>

  </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {useStore} from "vuex"
import {key, State} from "@/store"
import ToggleTable from "@/components/ToggleTable.vue"
import {IApiAbout, IApiExhibitionsAndAwards, IApiManifesto, IApiTheyWorkWithUs} from "@/api"

export default defineComponent({

  name: 'ViewAbout',
  components: {ToggleTable},

  data() {
    return {
      store: useStore(key),
      arrayOfToggleTableOpen: [] as number[],
    }
  },

  methods: {
    firstTableMounted() {
      console.log("mounted!")
        this.arrayOfToggleTableOpen = [0]
        ;(this.$refs.firstTable as any).toggled()
    },

    getThisTableIsOpen(index: number): boolean {
      return this.arrayOfToggleTableOpen.includes(index)
    },

    tableToggled(index: number, $event: number) {
      this.arrayOfToggleTableOpen = [ index ]
    },
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

.v-view-about__table-content {
  padding-top: $gutter / 2;
}

.v-view-about__table-content__item {
  padding-bottom: $gutter / 2;
}
</style>
