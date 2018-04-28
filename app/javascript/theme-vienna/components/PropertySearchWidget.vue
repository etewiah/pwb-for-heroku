<template>
  <v-container pt-2 px-0>
    <v-card height="">
      <transition name="search-box-fade">
        <v-card-text v-if="showTrans">
          <v-layout wrap row>
            <v-flex v-for="(fieldDetails, index) in searchFields" :key="fieldDetails.fieldName" :class="fieldDetails.classNames" offset-xs0>
              <template v-if="fieldDetails.inputType == 'select'">
                <SelectField @selectChanged="updateSearch" :fieldDetails="fieldDetails" :currentFieldValue="routeParams[fieldDetails.queryStringName]" :fieldOptions="searchFieldOptions"></SelectField>
              </template>
              <template v-else-if="fieldDetails.inputType == 'slider'">
                <SearchSlider @selectChanged="updateSearch" :fieldDetails="fieldDetails" :routeParams="routeParams" :fieldOptions="searchFieldOptions"></SearchSlider>
              </template>
            </v-flex>
          </v-layout>
        </v-card-text>
      </transition>
    </v-card>
  </v-container>
</template>
<script>
import SelectField from '@jsroot/theme-vienna/components/form-fields/SelectField'
import SearchSlider from '@jsroot/theme-vienna/components/form-fields/SearchSlider'
// import _ from 'lodash'
export default {
  components: {
    SearchSlider,
    SelectField
  },
  props: ["searchFields", "routeParams"],
  methods: {
    updateSearch(fieldDetails) {
      this.$emit('updateSearch', fieldDetails)
    }
  },
  computed: {
    searchFieldOptions() {
      return this.$store.state.searchFieldOptions
    },
  },
  data: () => ({
    show: false,
    showTrans: false
  }),
  mounted: function() {
    this.show = true
    var that = this
    setTimeout(function() {
      that.showTrans = true
    }, 100)
  }
}
</script>
<style>
.search-box-fade-enter-active {
  transition: all 3s ease;
}
.search-box-fade-leave-active {
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
  transition-delay: 3s;
}
.search-box-fade-enter,
.search-box-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


</style>
