<template>
  <section>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-5">
        <v-flex xs12 sm6>
          <ContactUsForm></ContactUsForm>
        </v-flex>
        <v-flex xs12 sm4 offset-sm1>
          <v-card class="elevation-2 transparent">
            <v-card-title primary-title class="layout justify-center">
              <div class="headline ml-2">
                {{$t("client.contactUs") }}
              </div>
            </v-card-title>
            <v-card-text>
              <div class="title mb-3">
                {{ $store.state.currentAgency.display_name }}
              </div>
              <div v-if="agencyAddress">
                {{agencyAddress.street_number + " " + agencyAddress.street_address }}
                <div>
                  {{agencyAddress.city }}
                </div>
                <div>
                  {{agencyAddress.postal_code }}
                </div>
              </div>
            </v-card-text>
            <v-list class="transparent">
              <v-list-tile v-if="$store.state.currentAgency.phone_number_primary">
                <v-list-tile-action>
                  <v-icon class="accent--text text--lighten-2">phone</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ $store.state.currentAgency.phone_number_primary }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="$store.state.currentAgency.email_primary">
                <v-list-tile-action>
                  <v-icon class="accent--text text--lighten-2">email</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ $store.state.currentAgency.email_primary }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
          <div v-if="mapMarkers">
            <pwb-map style="min-height: 600px;" :mapMarkers="mapMarkers" :zoom="15">
            </pwb-map>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>
<script>
import PwbMap from '@jsroot/theme-vienna/components/PwbMap'
import ContactUsForm from '@jsroot/theme-vienna/components/sections/ContactUsForm'
export default {
  components: {
    PwbMap,
    ContactUsForm,
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    agencyAddress: function() {
      if (this.$store.state.currentAgency.primary_address) {
        return this.$store.state.currentAgency.primary_address
      } else {
        return null
      }
    },
    mapMarkers: function() {
      if (this.$store.state.currentAgency.agency_map_marker) {
        return [this.$store.state.currentAgency.agency_map_marker]
      } else {
        return null
      }
    }
  },
  methods: {}
}

</script>
<style>
/*  .list__tile__title {
    white-space: normal;
  }*/

</style>
