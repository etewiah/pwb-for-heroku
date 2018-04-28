<template>
  <router-link :key="item.slug" class="btn my-flat btn--router accent--text" style="position: relative;" :style="{ backgroundColor: colors.backgroundColor }" :to="{path: item.target_path}" :exact="item.exact" flat>
    <span class="btn__content" color="" :style="{ color: colors.color }">
              {{item.link_title}}
            </span>
  </router-link>
</template>
<script>
// import VBtn from 'vuetify/src/components/VBtn/VBtn'
// had tried to extend VBtn but there was an issue with the spread operator
export default {
  props: ["item"],
  name: 'my-btn',
  // extends: VBtn,
  computed: {
    colors: function() {
      let colors = {
        backgroundColor: "",
        color: this.$vuetify.theme.secondary
      }
      if (this.$route.path === this.item.target_path) {
        colors.backgroundColor = this.$vuetify.theme.secondary
        colors.color = "white"
      } else {}
      return colors
    }
  },
  // methods: {
  //   genContent() {
  //     return this.$createElement(
  //       'div', { 'class': 'my-class-btn__content' }, [this.$slots.default]
  //     )
  //   }
  // }
}

</script>
<style scoped>
.my-flat {
  box-shadow: none!important;
}

.router-link-exact-active:after {
    top: 0;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #fff;
    border-width: 10px;
    margin: 0px 0 0 -10px;
}

</style>
