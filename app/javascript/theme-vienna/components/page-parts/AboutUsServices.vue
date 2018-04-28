<template>
  <section v-if="blockContents" fluid>
    <v-layout container wrap class="my-5" align-center>
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline"></h2>
          <span class="subheading">
              </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <!--         <transition name="tray">
          <p v-if="showTrans" class="headline text-sm-right">
            Beautiful property listings</p>
        </transition> -->
        <transition name="slide-fade">
          <v-card v-if="showTrans" class="elevation-5 transparent">
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="aus-card elevation-0 transparent">
                    <div class="text-xs-center pt-4">
                        <v-icon x-large class="primary--text">fa fa-home icon-service</v-icon>
                    </div>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{blockContents.blocks.title_a.content}}</div>
                    </v-card-title>
                    <v-card-text>
                      <span v-html="blockContents.blocks.content_a.content"></span> </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="aus-card elevation-0 transparent">
                    <div class="text-xs-center pt-4">
                      <v-icon x-large class="primary--text">fa fa-user icon-service</v-icon>
                    </div>
                    <!--                 <v-card-text class="text-xs-center">
                  <v-btn fab dark large color="purple">
                    <v-icon small class="">fa fa-user</v-icon>
                  </v-btn>
                </v-card-text> -->
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{blockContents.blocks.title_b.content}}</div>
                    </v-card-title>
                    <v-card-text>
                      <span v-html="blockContents.blocks.content_b.content"></span> </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="aus-card elevation-0 transparent">
                    <div class="text-xs-center pt-4">
                      <v-icon x-large class="primary--text">fa fa-money-bill-alt icon-service</v-icon>
                    </div>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">{{blockContents.blocks.title_c.content}}</div>
                    </v-card-title>
                    <v-card-text>
                      <span v-html="blockContents.blocks.content_c.content"></span> </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </transition>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
export default {
  data: () => ({
    showTrans: false
  }),
  mounted: function() {
    var that = this
    setTimeout(function() {
      that.showTrans = true
    }, 2000)
  },
  props: ["blockContents"],
}

</script>
<style>
.icon-service {
  text-align: center;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  -ms-border-radius: 100px;
  -o-border-radius: 100px;
  border-radius: 100px;
  width: 110px;
  padding: 30px;
  margin: 13px 0;
  font-size: 45px;
  border: 1px solid;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  -ms-border-radius: 100px;
  -o-border-radius: 100px;
  border-radius: 100px;
  /* padding:20px; */
  /* margin:13px 0; */
  transition: all 300ms ease-in-out;
  -o-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  -webkit-transition: all 300ms ease-in-out;

}

/*.tray-enter,
.tray-leave-to {
  opacity: 0
}

.tray-leave,
.tray-enter-to {
  opacity: 1
}

.tray-enter-active,
.tray-leave-active {
  transition: opacity 300ms
}
*/

.slide-fade-enter-active {
  transition: all 3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition-delay: 3s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


.aus-card {
  border: 1px solid;
}

</style>
