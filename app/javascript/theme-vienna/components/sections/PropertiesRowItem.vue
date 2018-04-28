<template>
  <transition name="slide-fade">
    <v-card v-if="showTransitionWithDelay" hover :to="{name: 'propertyDetails',
         params: { locale: $store.state.currentLocale, 
         propertyId: property.id,
         saleOrRent: buyOrRent}
       }">
      <v-card-media :src="property.primary_image_url" height="300px">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text" v-text="" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <truncate clamp="..." :length="25" class="headline" less="Show Less" :text="property.title"></truncate>
          <span class="grey--text"></span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn>
          <span class="" v-if="buyOrRent == 'buy'">
            <PriceWithCurrency :value="property.price_sale_current_cents"></PriceWithCurrency>
            </span>
          <span class="" v-if="buyOrRent == 'rent'">
            <PriceWithCurrency :value="property.price_rental_monthly_current_cents"></PriceWithCurrency>
          </span>
        </v-btn>
        <v-btn color="">
          <v-icon small>fa fa-shower</v-icon>
          <v-spacer></v-spacer>
          {{property.count_bathrooms }}
        </v-btn>
        <v-btn class="hidden-sm-and-down">
          <v-icon small>fa fa-bed</v-icon>
          <v-spacer></v-spacer>
          {{property.count_bedrooms }}
        </v-btn>
        <v-btn class="hidden-md-and-down"><i class="fa fa-arrows-alt"></i>
          <v-spacer></v-spacer>
          {{property.constructed_area }}m<sup>2</sup>
        </v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>
<script>
import PriceWithCurrency from '@jsroot/theme-vienna/components/PriceWithCurrency'
import truncate from 'vue-truncate-collapsed'
export default {
  components: {
    PriceWithCurrency,
    truncate
  },
  props: ["property", "buyOrRent", "showTransition", "index"],
  data: () => ({
    showTransitionWithDelay: false
  }),
  watch: {
    'showTransition' (newVal, oldVal) {
      if (newVal) {
        var delay = this.index * 500
        var that = this
        setTimeout(function() {
          that.showTransitionWithDelay = true
        }, delay)
      }
    }
  },
  mounted: function() {
    // var that = this
    // setTimeout(function() {
    //   // debugger
    //   that.showTrans = true
    // }, 3000)
  }
}

</script>
<style>
/*.truncate {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 95%;
}*/

</style>
