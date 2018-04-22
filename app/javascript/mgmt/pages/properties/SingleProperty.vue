<template>
  <div>
    <v-toolbar dark color="cyan" flat>
      <v-toolbar-title>Editing property</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-tabs dark color="cyan" slot="extension" slider-color="yellow">
      <v-tab class="cyan" v-for="(tab, index) in propertyTabs" :to="{name: 'singlePropertyTab', params: {tabName: tab.tabValue}}" :id="index" dark>
        {{ $t(tab.tabTitleKey) }}
      </v-tab>
      <v-tabs-items>
      </v-tabs-items>
    </v-tabs>
    <!--     <v-layout row wrap class="">
      <v-flex xs12 class="text-xs-center">
 -->
    <router-view/>
    <!--       </v-flex>
    </v-layout>
 -->
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    propertyTabs() {
      return this.$store.state.navigationStore.propertyTabs
    },
    // property() {
    //   return this.$store.state.property
    // }
  },
  mounted: function() {
    this.$store.dispatch('loadProperty', this.$route.params["id"])
  },
  methods: {

  }
}
</script>