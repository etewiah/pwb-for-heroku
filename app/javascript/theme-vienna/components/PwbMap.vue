<template>
  <gmap-map style="min-height: 600px;" :zoom="15" :center="center">
    <gmap-info-window ref="infwin" :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
    </gmap-info-window>
    <gmap-marker v-for="(m,i) in mapMarkers" :key="m.id" :position="m.position" @mouseover="toggleInfoWindow(m,i)" @mouseout="statusText = null" :clickable="true" :draggable="true" @click=""></gmap-marker>
  </gmap-map>
</template>
<script>
export default {
  props: ["mapMarkers"],
  data: function() {
    return {
      newMarkers: [],
      useNewMarkers: false,
      infoContent: '',
      statusText: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: "hey",
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  // created() {
  // },
  mounted: function() {
    var that = this
    // this.$refs.mmm.$mapCreated.then(function() {
    //   debugger
    //   if (that.mapkers.length > 1) {
    //     let google = {}
    //     var bounds = new google.maps.LatLngBounds()
    //     that.mapkers.forEach(function(mapker) {
    //       bounds.extend(mapker.position)
    //     })
    //     // for (let m of that.mapkers) {
    //     //   bounds.extend(m.position)
    //     // }
    //     that.$refs.mmm.$mapObject.fitBounds(bounds)
    //     // where markers are too close together, I need below
    //     // to ensure they are not too zoomed in
    //     that.$refs.mmm.$mapObject.setOptions({ maxZoom: that.$refs.mmm.$mapObject.getZoom() })
    //   }
    // })
  },
  methods: {
    resetMarkers: function(newMarkers) {
      this.newMarkers = newMarkers
      this.useNewMarkers = true
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position
      var display_price_html = ""
      if (marker.display_price) {
        display_price_html = '<div class="iw-subTitle">' + marker.display_price + '</div>'
      }
      var image_html = ""
      if (marker.image_url) {
        image_html = '<img src="' + marker.image_url + '" alt="" width="225">'
      }

      var infoWindowContent = '<div id="iw-container">' +
        '<a href="' + marker.show_url + '" class="">' +
        '<div class="iw-title">' + marker.title + '</div>' +
        '<div class="iw-content">' +
        display_price_html +
        image_html +
        '</div></a>' +
        '</div>'

      this.infoOptions.content = infoWindowContent
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },
  // watch: {
  //   mapkers(mapkers) {
  //   }
  // },
  computed: {
    center: function() {
     if (this.mapMarkers[0] && this.mapMarkers[0].position.lat) {
        let lat = this.mapMarkers[0].position.lat
        let lng = this.mapMarkers[0].position.lng
        return { lat: lat, lng: lng }
      } else {
        let latLng = { lat: 10, lng: 10 }
        return latLng
      }
      // `this` points to the vm instance
    }
  },
}

</script>
