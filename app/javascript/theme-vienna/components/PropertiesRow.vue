<template>
  <v-container v-scroll="onScroll" pb-5 grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="(property, index) in propertiesForRent" :key="property.id">
        <PropertiesRowItem :showTransition="showTransition" :property="property" :buyOrRent="'rent'" :index="index"></PropertiesRowItem>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="(property, index) in propertiesForSale" :key="property.id + 'sale'">
        <PropertiesRowItem :showTransition="showTransition" :property="property" :buyOrRent="'buy'" :index="index"></PropertiesRowItem>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import PriceWithCurrency from '@jsroot/theme-vienna/components/PriceWithCurrency'
import PropertiesRowItem from '@jsroot/theme-vienna/components/sections/PropertiesRowItem'
export default {
  components: {
    PriceWithCurrency,
    PropertiesRowItem
  },
  props: ["propertiesForSale", "propertiesForRent"],
  data: () => ({
    show: false,
    showTransition: false,
    scrollWatchReady: false,
    inView: false
  }),
  methods: {
    onScroll(e) {
      // console.log(window.innerHeight || document.documentElement.clientHeight)
      // console.log(e.target.scrollTop)
      let rect = this.$el.getBoundingClientRect()
      this.inView = (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth)
      )

      if (this.inView && this.scrollWatchReady) {
        this.showTransition = true
      }
    }
  },
  // computed: {
  //   allPropertiesToDisplay() {
  //     let mergedProps = this.propertiesForRent
  //     return mergedProps
  //   },
  // },
  watch: {
    'propertiesForSale' (newVal, oldVal) {
      if (newVal) {
        this.scrollWatchReady = true
      }
    }
  },

  mounted: function() {
    // this.$nextTick(() => {
    //   debugger
    //   this.scrollWatchReady = true
    //   console.log(this.$el.clientHeight)
    // })
  }
}

</script>
