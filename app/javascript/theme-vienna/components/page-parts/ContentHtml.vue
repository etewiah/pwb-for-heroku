<template>
  <transition name="router-anim">
    <section v-if="showTransition" fluid>
      <v-container>
        <v-layout column wrap class="my-1" align-center>
          <v-flex xs12>
            <span v-html="blockContents.blocks.main_content.content"></span>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </transition>
</template>
<script>
export default {
  props: ["blockContents"],
  data: () => ({
    showTransition: false
  }),
  watch: {
    'blockContents' (newVal, oldVal) {
      if (oldVal) {
        // if there had been blockContents before
        // below will activate transition out
        this.showTransition = false
      }
      if (newVal) {
        // and below will activate transition in
        // if there is new content
        var that = this
        setTimeout(function() {
          that.showTransition = true
        }, 200)
      }

    }
  },
}

</script>
<style>
/*@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";*/

.router-anim-enter-active {
  animation: coming .3s;
  animation-timing-function: cubic-bezier(.65, 0, .32, 1.55);
  opacity: 0;
}

.router-anim-leave-active {
  animation: going .1s;
  animation-timing-function: cubic-bezier(.8, -0.49, .36, 1);
}

@keyframes going {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(300px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateY(300px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

</style>
