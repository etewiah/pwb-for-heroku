<template>
  <v-app class="main-app-wrap" v-resize="onResize" light>
    <v-layout>
      <v-container :fluid="fluid" class="main-app-ct mt-0 pb-0 pl-0 pr-0 pt-0 elevation-0">
        <!-- had elavation-20 above but it causes a horizontal cross shadow on old ios safari -->
        <v-toolbar class="primary elevation-0" style="height:28px;" primary>
          <v-container pt-1 mt-0>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <LangSwitcher></LangSwitcher>
            </v-toolbar-items>
            <!-- <span v-text="title" style="margin-top: -30px;"></span> -->
          </v-container>
        </v-toolbar>
        <MainNav :displaySettings="displaySettings"></MainNav>
        <v-expansion-panel style="display: none;">
          <v-expansion-panel-content>
            <v-card>
              <v-card-text>tttt</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <!-- <ThemeGenerator></ThemeGenerator> -->
        <v-content class="">
          <router-view/>
        </v-content>
      </v-container>
    </v-layout>
    <v-footer class="pt-0" style="background: transparent;">
      <v-container :fluid="fluid" class="pa-0" light>
        <PageFooter></PageFooter>
        <!--  -->
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
// import ThemeGenerator from '@jsroot/theme-vienna/components/ThemeGenerator'
import LangSwitcher from '@jsroot/theme-vienna/components/LangSwitcher'
import PageFooter from '@jsroot/theme-vienna/components/PageFooter'
import MainNav from '@jsroot/theme-vienna/components/sections/MainNav'

export default {
  components: {
    // ThemeGenerator,
    LangSwitcher,
    PageFooter,
    MainNav

  },
  data() {
    return {
      // locales: ['en', 'nl', 'es'],
      colors: ['blue', 'green', 'purple', 'red'],
      // fluid: true,
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PropertyWebBuilder'
    }
  },
  methods: {
    onResize() {
      // TODO - make use of this event
      // this.$vuetify.breakpoint.smAndDown
      // this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      // console.log(this.windowSize)
      // console.log(this.$vuetify.breakpoint)
    }
  },
  name: 'App',
  beforeCreate: function() {
    // when served by rails, "/" should redirect to a route 
    // with a locale but just in case will default to "en"
    let locale = this.$route.params["locale"]

    // let params = this.$route.params
    if (!locale) {
      locale = "en"
      let newParams = {
        locale: locale
      }
      this.$router.push({ name: 'landing', params: newParams })
    }
    // || "en"
    this.$store.commit('setCurrentLocale', locale)
  },
  watch: {
    // active: {
    //   handler() {
    //     this.color = { hex: this.theme[this.active] }
    //   },
    //   immediate: true
    // },
    theme: {
      handler() {
        this.$vuetify.theme = this.theme
      },
      deep: true
    }
  },
  mounted: function() {
    this.$store.dispatch('loadSettings')
    // let primaryColor = this.styleVariables.primary_color || "#68c368"
    // let secondaryColor = this.styleVariables.secondary_color || "#8ec449"
    // this.$vuetify.theme = {
    //   primary: primaryColor,
    //   secondary: secondaryColor,
    //   // secondary: "#e57373",
    //   accent: "#9c27b0",
    //   error: "#f44336",
    //   warning: "#ffeb3b",
    //   info: "#2196f3",
    //   success: "#4caf50"
    // }
  },
  computed: {
    styleVariables() {
      return this.$store.state.displaySettings.style_variables || {}
    },
    theme() {
      let primaryColor = this.styleVariables.primary_color
      // || "#68c368"
      let secondaryColor = this.styleVariables.secondary_color
      // || "#8ec449"
      let footerColor = this.styleVariables.footer_bg_color
      let footerMainTextColor = this.styleVariables.footer_main_text_color
      // below shoud be footerSecColor
      let footerSecTextColor = this.styleVariables.footer_sec_text_color
      let labelsTextColor = this.styleVariables.labels_text_color
      let actionColor = this.styleVariables.action_color
      let theme = {
        footerTextColor: footerMainTextColor,
        footerSecColor: footerSecTextColor,
        primary: primaryColor,
        secondary: secondaryColor,
        // secondary: "#e57373",
        accent: actionColor,
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50",
        footercolor: footerColor
      }
      return theme
    },
    fluid() {
      let body_style = this.styleVariables.body_style || "siteLayout.wide"
      return body_style === "siteLayout.wide"
    },
    displaySettings() {
      return this.$store.state.displaySettings
    },
  },
}
</script>
<style>
/*@import "scss/fontawesome.scss"*/


/*@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,100italic,300italic");
*/

@import url("https://use.fontawesome.com/releases/v5.0.6/css/all.css");
.main-app-wrap {
  display: -webkit-box;
  /*  display: -ms-inline-flexbox;
  display: inline-flex;*/
}


body {
  background-color: #fafafa;
}

.toolbar__items {
  float: right;
}
</style>