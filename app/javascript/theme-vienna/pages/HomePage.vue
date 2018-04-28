<template>
  <div>
    <LandingHero :blockContents="currentPageParts.landing_hero"></LandingHero>
    <AboutUsServices :blockContents="currentPageParts.about_us_services"></AboutUsServices>
    <PropertiesRow :propertiesForSale="propertiesForSale"
      :propertiesForRent="propertiesForRent" ></PropertiesRow>
    <!-- <PropertiesRow :propertiesForSale="propertiesForRent" :saleOrRent="'rent'" ></PropertiesRow> -->
    <section style="display:none;">
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-5">
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Company info</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>
<script>
import LandingHero from '@jsroot/theme-vienna/components/page-parts/LandingHero'
import AboutUsServices from '@jsroot/theme-vienna/components/page-parts/AboutUsServices'
import PropertiesRow from '@jsroot/theme-vienna/components/PropertiesRow'
export default {
  metaInfo() {
    return {
      title: this.currentPage.page_title,
    }
  },
  components: {
    PropertiesRow,
    AboutUsServices,
    LandingHero,
  },
  watch: {
    '$route' (to, from) {
      if (to.params.locale !== from.params.locale) {
        this.$store.dispatch('loadPage', 'home')
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('loadPage', 'home')
  },
  computed: {
    currentPage() {
      return this.$store.state.currentPage
    },
    currentPageParts() {
      return this.$store.state.currentPageParts || {}
    },
    propertiesForSale() {
      if (this.$store.state.summaryProperties) {
        return this.$store.state.summaryProperties.for_sale
      } else {
        return []
      }
    },
    propertiesForRent() {
      if (this.$store.state.summaryProperties) {
        return this.$store.state.summaryProperties.for_rent
      } else {
        return []
      }
    },
  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* http://stuffandnonsense.co.uk/blog/about/hardboiled_css3_media_queries*/


/* Smartphones (portrait and landscape) ----------- */

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  /* Styles */
}


/* Smartphones (landscape) ----------- */

@media only screen and (min-width: 321px) {
  /* Styles */
}


/* Smartphones (portrait) ----------- */

@media only screen and (max-width: 320px) {
  /* Styles */
}


/* iPads (portrait and landscape) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Styles */
}


/* iPads (landscape) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  /* Styles */
}


/* iPads (portrait) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  /* Styles */
}


/* Desktops and laptops ----------- */

@media only screen and (min-width: 1224px) {
  /* Styles */
}


/* Large screens ----------- */

@media only screen and (min-width: 1824px) {
  /* Styles */
}


/* iPhone 4 ----------- */

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
only screen and (min-device-pixel-ratio: 1.5) {
  /* Styles */
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
