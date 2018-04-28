<template>
  <section>
    <div>
      <v-flex xs12>
        <v-card class="elevation-1">
          <v-card-title primary-title class="layout justify-center">
            <div class="display-1">
              {{currentProperty.title}}
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <template v-if="currentProperty.image_urls">
          <v-carousel>
            <v-carousel-item v-for="(item,i) in currentProperty.image_urls" :src="item" :key="i"></v-carousel-item>
          </v-carousel>
        </template>
      </v-flex>
    </div>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center class="my-0">
        <v-flex xs12 sm8>
          <v-card class="elevation-1">
            <v-card-title primary-title class="layout row wrap justify-center">
              <v-btn class="xs3">
                <PriceWithCurrency :value="currentProperty.price_sale_current_cents"></PriceWithCurrency>
              </v-btn>
              <v-btn class="xs3" color="">
                <v-icon small>fa fa-shower</v-icon>
                <v-spacer></v-spacer>
                {{currentProperty.count_bathrooms }}
              </v-btn>
              <v-btn class="xs3" color="">
                <v-icon small>fa fa-bed</v-icon>
                <v-spacer></v-spacer>
                {{currentProperty.count_bedrooms }}
              </v-btn>
              <v-btn class="xs3"><i class="fa fa-arrows-alt"></i>
                <v-spacer></v-spacer>
                {{currentProperty.constructed_area }}m<sup>2</sup>
              </v-btn>
              <div class="headline">
              </div>
            </v-card-title>
            <v-card-text>
              <div class="">
                <span v-html="currentProperty.description"></span>
              </div>
              <div class="pt-5">
                <v-chip outline v-for="(item,i) in currentProperty.extras_for_display" :src="item" :key="i" color="green">
                  <v-icon left>check_circle</v-icon>{{item}}
                </v-chip>
              </div>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>
          <div class="justify-center text-xs-center pt-4">
            <social-sharing class="center" inline-template>
              <div class="social-icons icon-circle">
                <network network="facebook">
                  <a>
                    <v-icon large style="color: #3C599F;" size="20px">fab fa-facebook</v-icon>
                  </a>
                </network>
                <network network="googleplus">
                  <a>
                    <v-icon large style="color: #CF3D2E;" size="20px">fab fa-google-plus</v-icon>
                  </a>
                </network>
                <network network="linkedin">
                  <a>
                    <v-icon large color="" style="color: #0085AE;" size="20px">fab fa-linkedin</v-icon>
                  </a>
                </network>
                <network network="twitter">
                  <v-btn large icon>
                    <v-icon large color="blue" size="20px">fab fa-twitter</v-icon>
                  </v-btn>
                </network>
              </div>
            </social-sharing>
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <PropertyEnquiry :propId="currentProperty.id"></PropertyEnquiry>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid class="pa-0">
      <pwb-map style="min-height: 600px;" :mapMarkers="mapMarkers" :zoom="15">
      </pwb-map>
    </v-container>
  </section>
</template>
<script>
import PwbMap from '@jsroot/theme-vienna/components/PwbMap'
import PropertyEnquiry from '@jsroot/theme-vienna/components/sections/PropertyEnquiryForm'
import PriceWithCurrency from '@jsroot/theme-vienna/components/PriceWithCurrency'
export default {
  metaInfo() {
    return {
      title: this.currentProperty.title,
    }
  },
  components: {
    PriceWithCurrency,
    PropertyEnquiry,
    PwbMap,
  },
  props: [],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('loadProperty', to.params.propertyId)
    }
  },
  mounted: function() {
    this.$store.dispatch('loadProperty', this.$route.params["propertyId"])
  },
  computed: {
    currentProperty() {
      return this.$store.state.currentProperty
    },
    mapMarkers: function() {
      if (this.currentProperty && this.currentProperty.id) {
        let mapMarker = {
          id: this.currentProperty.id,
          title: this.currentProperty.title,
          image_url: this.currentProperty.primary_image_url,
          position: {
            lat: this.currentProperty.latitude,
            lng: this.currentProperty.longitude
          }
        }
        return [mapMarker]
      } else {
        return []
      }
    }
  },
  data() {
    return {}
  },
}

</script>
<style scoped>
.carousel {
  height: 1000px;
}
@media only screen and (max-width: 1903px) {
  .carousel {
    height: 800px;
  }
}
@media only screen and (max-width: 1263px) {
  .carousel {
    height: 600px;
  }
}
@media only screen and (max-width: 959px) {
  .carousel {
    height: 500px;
  }
}

@media only screen and (max-width: 599px) {
  .carousel {
    height: 350px;
  }
}

@media only screen and (min-width: 768px) {}

@media only screen and (max-width: 599px) {}

</style>
