<template>
  <div class="footercolor" :style="{ color: $vuetify.theme.footerTextColor }" flat tile>
    <cookie-law theme="dark-lime" :buttonText="$t('client.gotIt')">
      <div slot="message">
        {{$t("client.cookieMessage") }}
        <router-link :to="{path: cookieLawLink}">{{$t("client.clickForMore") }}</router-link>
      </div>
    </cookie-law>
    <v-container fill-height :dark="dark" class="pb-0 pt-4">
      <v-layout row wrap align-baseline>
        <v-flex xs4>
          <div class="title mb-3">
            {{ currentAgency.display_name }}
          </div>
          <div v-if="currentAgency.phone_number_primary">
            <v-icon size="18px" color="footerTextColor" class="mr-3">fa-phone</v-icon>
            {{ currentAgency.phone_number_primary }}
          </div>
          <div v-if="currentAgency.email_primary">
            <v-icon size="18px" color="footerTextColor" class="mr-3">fa-envelope</v-icon>
            {{ currentAgency.email_primary }}
          </div>
        </v-flex>
        <v-flex xs4 class="mb-2" style="margin-top:auto;">
          <template v-for="(value, key) in displaySettings.social_media">
            <template v-if="socialMediaIcons[key]">
              <v-btn :href="value" icon class="mx-3">
                <v-icon large color="footerSecColor" size="24px">{{ socialMediaIcons[key].classes }}</v-icon>
              </v-btn>
            </template>
          </template>
        </v-flex>
        <v-flex xs4 class="" style="margin-top:auto;" align-baseline>
          <div> <span v-html="displaySettings.footer_html"></span>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="pt-0">
      <hr style="border-top:1px solid white;" class="mt-0 mb-3">
      <v-layout>
        <v-flex xs12 class="">
          <span class="text-sm-left">
            <template  v-for="link in footerLinks" >
            <router-link v-if="link.slug !== 'footer_admin'" :to="{path: link.target_path}" :key="link.slug" exact icon class="mr-3"
            :style="{ color: $vuetify.theme.footerTextColor }">
              {{link.link_title}}
            </router-link>
            <a v-else :href="link.target_path" :style="{ color: $vuetify.theme.footerTextColor }">
              {{link.link_title}}
            </a>
            </template>
          </span>
          <span class="text-sm-right ml-3" style="float:right;">
            Powered by <a class="" href="https://propertywebbuilder.com" target="_blank" :style="{ color: $vuetify.theme.footerTextColor }"><strong>PropertyWebBuilder</strong></a>
          </span>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import CookieLaw from 'vue-cookie-law'
export default {
  components: {
    CookieLaw,
    // FontAwesomeIcon
  },
  data() {
    return {
      socialMediaIcons: {
        facebook: {
          classes: "fab fa-facebook"
        },
        linkedin: {
          classes: "fab fa-linkedin"
        },
        twitter: {
          classes: "fab fa-twitter"
        },
        gplus: {
          classes: "fab fa-google-plus"
        },
        pinterest: {
          classes: "fab fa-pinterest"
        },
        youtube: {
          classes: "fab fa-youtube"
        },
      },
      // icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
    }
  },
  computed: {
    // colors: function() {
    //   return this.$vuetify.theme
    // },
    dark: function() {
      // TODO - figure out how to calculate this 
      // based on how dark the footer color is
      return true
    },
    displaySettings: function() {
      return this.$store.state.displaySettings
    },
    currentAgency: function() {
      return this.$store.state.currentAgency
    },
    cookieLawLink() {
      let locale = this.$route.params.locale || "en"
      return "/" + locale + "/p/legal"
    },
    footerLinks() {
      let footerLinks = []
      if (this.displaySettings.footer_links) {
        let adminUrl = this.currentAgency.admin_url
        this.displaySettings.footer_links.forEach(function(link) {
          if (link.slug === "footer_admin") {
            link.target_path = adminUrl
          }
          footerLinks.push(link)

          // if (link.slug !== "footer_admin") {
          // }
        })
      }
      return footerLinks
    }

  },
  methods: {}
}

</script>
<style scoped>


</style>
