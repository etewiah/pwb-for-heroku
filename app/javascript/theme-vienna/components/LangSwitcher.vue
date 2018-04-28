<template>
  <div class="contenedor_idiomas">
    <ul class="idiomas">
      <template v-for="locale in expLocales">
        <li :class="[locale.selected]">
          <a @click="switchLocale(locale)" :class="[locale.variant, locale.selected]"></a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    expLocales: function() {
      let locales = this.$store.state.displaySettings.supported_locales || []
      let expLocales = []
      let currentLocale = this.$route.params["locale"]
      locales.forEach(function(locale) {
        let selected = ""
        // locales are saved like so en-GB
        // The second part is used for the class
        // so I can use different flag icons for 
        // different countries
        let localeAndVar = locale.split("-")
        let variant = localeAndVar[1] || localeAndVar[0]
        if (localeAndVar[0] === currentLocale) {
          selected = "selected"
        }
        expLocales.push({
          shortLocale: localeAndVar[0],
          variant: variant.toLowerCase(),
          selected: selected
        })
      })
      return expLocales
    }
  },
  methods: {
    switchLocale(locale) {
      // console.log(this.$route)
      let params = this.$route.params
      // params["locale"] = locale.shortLocale
      // doing above and pushing that to the router
      // would mean from and to in my route watch
      // would be the same
      let newParams = {
        locale: locale.shortLocale
      }
      this.$store.commit('setCurrentLocale', locale.shortLocale)
      this.$store.dispatch('loadSettings')

      // this.$router.replace({ name: this.$route.name, params: params })
      this.$router.push({ name: this.$route.name, params: newParams })
      // location.reload()
      // this.$router.go()
    }
  }
}

</script>
<style scoped>
.contenedor_idiomas {
  /*background: blue;*/
}

ul.idiomas {
  float: right;
  padding: 0 15px 10px 10px;
  margin: -7px 0px -5px 10px;
  background-color: #fff;
}

ul.idiomas li {
  float: left;
  list-style: none outside none;
  margin: 0 0 0 5px;
  padding: 11px 0 0 0;
  width: 20px;
}

ul.idiomas li a {
  display: block;
  width: 20px;
  height: 14px;
  outline: 1px solid #555;
  margin: 0;
}
ul.idiomas .es {
  background: url("/static/img/idiomas.png") 0 0 no-repeat;
}
ul.idiomas .en,
ul.idiomas .uk {
  background: url(/static/img/idiomas.png) -20px 0;
}

ul.idiomas .ru {
  background: url("/static/img/idiomas.png") -40px 0;
}

ul.idiomas .sv {
  background: url("/static/img/idiomas.png") -60px 0;
}

ul.idiomas .no {
  background: url("/static/img/idiomas.png") -80px 0;
}

ul.idiomas .de {
  background: url("/static/img/idiomas.png") -100px 0;
}

ul.idiomas .fr {
  background: url("/static/img/idiomas.png") -120px 0;
}

ul.idiomas .ne {
  background: url("/static/img/idiomas.png") -140px 0;
}

ul.idiomas .ch {
  background: url("/static/img/idiomas.png") -160px 0;
}

ul.idiomas .fi {
  background: url("/static/img/idiomas.png") -180px 0;
}

ul.idiomas .eu {
  background: url("/static/img/idiomas.png") -200px 0;
}

ul.idiomas .pt {
  background: url("/static/img/idiomas.png") -220px 0;
}

ul.idiomas .ar {
  background: url("/static/img/idiomas.png") -240px 0;
}

ul.idiomas .ca {
  background: url("/static/img/idiomas.png") -260px 0;
}

ul.idiomas .br {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/br.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .cl {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/cl.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .hi {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/hi.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .it {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/it.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .mx {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/mx.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .nl {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/nl.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .pl {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/pl.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .ro {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/ro.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .us {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/us.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .vi {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/vn.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .tr {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/tr.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .kr {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/kr.svg") no-repeat;
  background-size: cover;
}

ul.idiomas .bg {
  background: url("https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/bg.svg") no-repeat;
  background-size: cover;
}

ul.idiomas li.selected,
ul.idiomas li:hover {
  background: url("/static/img/simple-nav-arrow.png") no-repeat top center;
}

</style>
