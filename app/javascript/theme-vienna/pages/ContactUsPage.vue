<template>
  <div>
    <ContentHtml :blockContents="currentPageParts.content_html"></ContentHtml>
    <FormAndMap></FormAndMap>
  </div>
</template>
<script>
import ContentHtml from '@jsroot/theme-vienna/components/page-parts/ContentHtml'
import FormAndMap from '@jsroot/theme-vienna/components/page-parts/FormAndMap'
export default {
  metaInfo() {
    return {
      title: this.$store.state.currentPage.page_title,
    }
  },
  components: {
    FormAndMap,
    ContentHtml,
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('loadPage', 'contact-us')
      // all above achieves is to ensure that title meta
      // is updated correctly when languabe changes
    }
  },
  mounted: function() {
    this.$store.dispatch('loadPage', 'contact-us')
  },
  computed: {
    // currentPage() {
    //   return this.$store.state.currentPage
    // },
    currentPageParts() {
      return this.$store.state.currentPageParts || {}
    }
  },
}

</script>
<style scoped>
/*h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/

</style>
