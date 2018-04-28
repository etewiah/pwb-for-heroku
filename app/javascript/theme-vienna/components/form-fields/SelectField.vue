<template>
  <div class="mt-4 mr-5">
    <div class="text-xs-left">
    </div>
    <v-select :items="selectItems" v-model="localFieldValue" :label="$t(fieldDetails.labelTextTKey)" @change="fieldChangeHandler" item-text="name" single-line bottom></v-select>
  </div>
</template>
<script>
// import _ from 'lodash'
export default {
  props: ["fieldDetails", "currentFieldValue", "fieldOptions"],
  data() {
    return {
      localFieldValue: "",
      // originalValue: "",
    }
  },
  watch: {
    // 'cancelPendingChanges' (newValue, oldValue) {
    //   if (oldValue === false) {
    //     // when cancelPendingChanges on parent changes from 
    //     // false to true
    //     // reset model to its original value
    //     this.localFieldValue = this.originalValue
    //   }
    // },
    currentFieldValue: {
      handler(newValue, oldVal) {
        this.localFieldValue = this.fieldDetails.optionsKey + "." + newValue
        // this.originalValue = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {
    selectItems() {
      let untranslated = this.fieldOptions[this.fieldDetails.optionsKey] || null
      let selectItems = [{ name: "", value: "" }]
      let i18n = this.$i18n
      let fieldName = this.fieldDetails.fieldName
      if (untranslated) {
        untranslated.forEach(function(optionKey) {
          let name = i18n.t(optionKey)
          if (fieldName === "currency") {
            optionKey = optionKey.toUpperCase()
          }
          selectItems.push({
            name: name,
            value: optionKey
          })
        })
      }
      return selectItems
    },
  },
  methods: {
    fieldChangeHandler(selectKey) {
      // this.fieldDetails.newValueFullKey = selectKey
      // substr below removes the prefix for the key (like "propertyTypes.")
      // This is to avoid cluttering the url with long querystrings
      let shortSelectKey = selectKey.substr(this.fieldDetails.optionsKey.length + 1)
      this.fieldDetails.newValue = shortSelectKey
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}

</script>
