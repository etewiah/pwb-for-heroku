<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <transition-group name="prop-slide-fade" mode="out-in" class="layout row wrap" tag="div">
        <v-flex xs12 sm6 v-for="property in propertiesToDisplay" :key="property.id">
          <v-card hover style="margin: 9px 0px;" :to="{name: 'propertyDetails',
         params: { locale: $store.state.currentLocale, 
         propertyId: property.id,
         saleOrRent: saleOrRent}
       }">
            <v-layout row wrap>
              <v-flex style="padding: 0px;" xs6>
                <v-card transition="slide-x-transition">
                  <v-card-media :src="property.primary_image_url" height="200px">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <div class="ribbon dark fondo_accion" style="">
                            <span class="ma-0 prop-info-btn" v-if="saleOrRent == 'buy'">
                              <PriceWithCurrency :value="property.price_sale_current_cents"></PriceWithCurrency>
                            </span>
                              <span class="ma-0 prop-info-btn" v-if="saleOrRent == 'rent'">
                              <PriceWithCurrency :value="property.price_rental_monthly_current_cents"></PriceWithCurrency>
                            </span>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
              </v-flex>
              <v-flex style="padding: 0px;height:200px;" xs6>
                <v-layout row wrap align-end>
                  <v-flex style="height: 96px;" xs12>
                    <v-card-title class="pb-0" primary-title>
                      <div>
                        <div class="headline">{{ property.title }}</div>
                        <span class="grey--text"></span>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-layout row wrap align-end ma-0 style="height: 108px;padding-right: 4px;">
                  <v-flex xs4 pa-0>
                    <div class="ma-0 prop-info-btn btn" color="">
                      <v-icon small>fa fa-shower</v-icon>
                      <span class="pl-1"></span> {{property.count_bathrooms }}
                    </div>
                  </v-flex>
                  <v-flex xs4 pa-0>
                    <div class="ma-0 prop-info-btn btn" color="">
                      <v-icon small>fa fa-bed</v-icon>
                      <span class="pl-1"></span> {{property.count_bedrooms }}
                    </div>
                  </v-flex>
                  <v-flex xs4 pa-0>
                    <div class="ma-0 prop-info-btn btn"><i class="fa fa-arrows-alt"></i>
                      <span class="pl-1"></span> {{property.constructed_area }}m<sup>2</sup>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </transition-group>
    </v-layout>
  </v-container>
</template>
<script>
import PriceWithCurrency from '@jsroot/theme-vienna/components/PriceWithCurrency'
export default {
  components: {
    PriceWithCurrency
  },
  props: ["propertiesToDisplay", "saleOrRent"],
  data: () => ({
    showTrans: false
  }),
  mounted: function() {
    var that = this
    // setTimeout(function() {
    //   that.showTrans = true
    // }, 2000)
  }
}

</script>
<style scoped>
.btn__content {
  padding: 0px;
}
.prop-slide-fade-enter-active {
  transition: all .25s ease;
}
.prop-slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition-delay: .25s;
}
.prop-slide-fade-enter,
.prop-slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.prop-slide-fade-move {
  transition: transform 1s;
}

.cuadro_inmueble {
  position: relative;
}
.cuadro_inmueble .ribbon {
  /* right: -6px; */
  top: 10px;
}
.cuadro_inmueble.featured .ribbon {
  top: 12px;
}
.cuadro_inmueble .descripcion_destacado {
  width: 300px;
}



/*ribbon is for highlighted price*/

.ribbon {
  position: absolute;
  top: 20px;
  left: -5px;
  padding: 5px 10px;
}
.ribbon.base {
  background: #3498db;
  color: #fff;
  border-right: 5px solid #8bc4ea;
}
.ribbon.light {
  background: #ecf0f1;
  color: #2c3e50;
  border-right: 5px solid #dde4e6;
}
.ribbon.dark {
  background: #464646;
  color: #fff;
  /*border-right: 5px solid #464646;*/
}
.ribbon.base-alt {
  background: #9cd70e;
  color: #fff;
  border-right: 5px solid #c6f457;
}
.ribbon.red {
  background: #e91b23;
  color: #fff;
  border-right: 5px solid #f2787d;
}
.ribbon.orange {
  background: #ff8a3c;
  color: #fff;
  border-right: 5px solid #ffc7a2;
}
.ribbon.yellow {
  background: #ffd800;
  color: #fff;
  border-right: 5px solid #ffe866;
}
.ribbon:before,
.ribbon:after {
  content: '';
  position: absolute;
  left: -9px;
  border-left: 10px solid transparent;
}
.ribbon:before {
  top: 0;
}
.ribbon:after {
  bottom: 0;
}
.ribbon.base:before {
  border-top: 27px solid #3498db;
}
.ribbon.base:after {
  border-bottom: 27px solid #3498db;
}
.ribbon.light:before {
  border-top: 27px solid #ecf0f1;
}
.ribbon.light:after {
  border-bottom: 27px solid #ecf0f1;
}
.ribbon.dark:before {
  border-top: 27px solid #131313;
}
.ribbon.dark:after {
  border-bottom: 27px solid #131313;
}
.ribbon.base-alt:before {
  border-top: 27px solid #9cd70e;
}
.ribbon.base-alt:after {
  border-bottom: 27px solid #9cd70e;
}
.ribbon.red:before {
  border-top: 27px solid #e91b23;
}
.ribbon.red:after {
  border-bottom: 27px solid #e91b23;
}
.ribbon.orange:before {
  border-top: 27px solid #ff8a3c;
}
.ribbon.orange:after {
  border-bottom: 27px solid #ff8a3c;
}
.ribbon.yellow:before {
  border-top: 27px solid #ffd800;
}
.ribbon.yellow:after {
  border-bottom: 27px solid #ffd800;
}
.ribbon span {
  display: block;
  font-size: 16px;
  font-weight: 600;
}
.btn__content {
  padding: 0px;
}
.prop-info-btn {
  width: 100%;
  min-width: 20px;
}

</style>
