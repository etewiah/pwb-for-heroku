<template>
  <div class="mb-4">
    <v-subheader class="mb-3 pl-0 subheading text-xs-left">
      {{$t(fieldDetails.labelTextTKey) }}:
    </v-subheader>
    <vue-slider ref="slider" v-model="value" v-bind="sliderOptions" @callback="fieldChangeHandler">
      <template v-if="fieldDetails.fieldName == 'price'" slot="tooltip" slot-scope="{ value }">
        <span class="vue-slider-tooltip" :style="sliderOptions.tooltipStyle" >
          <PriceWithCurrency :value="value * 100"></PriceWithCurrency>
        </span>
      </template>
    </vue-slider>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component'
import PriceWithCurrency from '@jsroot/theme-vienna/components/PriceWithCurrency'
export default {
  components: {
    vueSlider,
    PriceWithCurrency
  },
  props: ["fieldDetails", "routeParams", "fieldOptions"],
  data() {
    return {
      localFieldValue: "",
      value: [],
    }
  },
  computed: {
    sliderOptions() {
      let sliderOptions = this.fieldDetails.sliderOptions
      let tooltipStyle = {
        backgroundColor: this.$vuetify.theme.accent,
        borderColor: this.$vuetify.theme.accent
      }
      sliderOptions.tooltipStyle = tooltipStyle
      sliderOptions.processStyle = tooltipStyle
      // sliderOptions.tooltipStyle.backgroundColor = this.$vuetify.theme.accent
      // debugger
      return sliderOptions
    },
  },
  mounted: function() {
    // this.$refs.slider.setValue([23, 44])
    // this.value
  },
  watch: {
    // 'fieldDetails' (newValue, oldValue) {
    // },
    routeParams: {
      handler(newRoutParams, oldVal) {
        let minQueryStringName = this.fieldDetails.fieldName + "_min"
        let maxQueryStringName = this.fieldDetails.fieldName + "_max"
        let minVal = newRoutParams[minQueryStringName] || this.fieldDetails.defaultValue[0]
        let maxVal = newRoutParams[maxQueryStringName] || this.fieldDetails.defaultValue[1]
        if (minVal && maxVal) {
          this.value = [minVal, maxVal]
          // this.$refs.slider.setValue([minVal, maxVal])
        }
        // this.$refs.slider.setValue([2, 33])
        // this.localFieldValue = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  methods: {
    fieldChangeHandler(newValue) {
      // let newValue = event.currentTarget.value
      this.fieldDetails.newValue = newValue
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}

</script>
