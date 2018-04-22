import Vue from 'vue'
import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import store from "../mgmt/store"
import router from "../mgmt/router"
import i18n from "../mgmt/i18n"
import App from '../mgmt/app.vue'


Vue.use(Vuetify, {
  theme: {
    primary: "#4286f4",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
})


document.addEventListener('DOMContentLoaded', () => {
  // const el = document.body.appendChild(document.createElement('hello'))
  const app = new Vue({
    el: "#mgmt-app",
    i18n,
    store,
    router,
    render: h => h(App)
  })

  // export const app = new Vue({
  //   el: "#app",
  //   router,
  //   store,
  //   i18n,
  //   components: { App },
  //   template: "<App/>"
  // });
  console.log(app)
})