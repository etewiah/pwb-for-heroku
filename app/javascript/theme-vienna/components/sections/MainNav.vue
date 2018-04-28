<template>
  <v-toolbar class="container pa-0 elevation-0">
    <v-toolbar-title>
      <router-link to="/">
        <template v-if="displaySettings.logo_url">
          <img :src="displaySettings.logo_url" alt="Logo" class="main-logo" style="padding-top: 8px;">
        </template>
        <template v-else>
          {{displaySettings.company_display_name }}
        </template>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <template v-for="item in visibleLinks">
        <MainNavBtn :item="item"></MainNavBtn>
      </template>
    </v-toolbar-items>
    <!-- <span class="hidden-sm-and-up"> <v-toolbar-side-icon> </v-toolbar-side-icon> </span> -->
    <v-menu bottom left>
      <v-btn icon slot="activator" class="hidden-md-and-up" light>
        <v-icon>reorder</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in visibleLinks" :key="item.slug" :to="{path: item.target_path}" :exact="item.exact">
          <v-list-tile-title flat>{{item.link_title}}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!--         <v-menu offset-y>
          <v-btn icon dark slot="activator">
            <v-icon dark>language</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="lang in locales" :key="lang" @mouseover.native="changeLocale(lang)">
              <v-list-tile-title>
                {{lang}}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <v-btn icon dark slot="activator">
            <v-icon dark>format_paint</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="n in colors" :key="n" :class="n" @mouseover.native="theme = n">
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <v-btn icon @click.stop="rightDrawer = !rightDrawer">
            <v-icon dark>language</v-icon>
          </v-btn>
        </v-menu> -->
  </v-toolbar>
</template>
<script>
import MainNavBtn from '@jsroot/theme-vienna/components/sections/MainNavBtn'

export default {
  components: {
    MainNavBtn
  },
  props: ["displaySettings"],
  computed: {
    visibleLinks() {
      let visibleLinks = []
      if (this.displaySettings.top_nav_links) {
        this.displaySettings.top_nav_links.forEach(function(link) {
          if (link.slug === "top_nav_home") {
            link.exact = true
          }
          if (link.slug !== "top_nav_admin") {
            visibleLinks.push(link)
          }
        })
      }
      return visibleLinks
    }
  }
}

</script>
<style scoped>
/*.btn--active {
  background-color: "$vuetify.theme.footerSecColor";
}*/

.main-logo {
  height: 72px;
}



/*@media only screen and (max-width: 768px) {
*/

@media only screen and (max-width: 959px) {
  .main-logo {
    height: 56px;
  }
}

</style>
