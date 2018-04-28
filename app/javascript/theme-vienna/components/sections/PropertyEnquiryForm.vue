<template>
  <v-card class="elevation-2">
    <v-card-title primary-title class="layout">
      <div class="headline text-sm-left ml-3">
        {{ $t("client.requestPropertyInfo") }}:
      </div>
    </v-card-title>
    <v-card-text>
      <!--       <form @submit.prevent="onSubmitEnquiry">
 -->
      <v-form v-model="formValid" ref="enqForm" lazy-validation @submit.prevent="onSubmitEnquiry">
        <v-layout wrap row>
          <v-flex v-for="(field) in propertyEnquiryFields" :key="field.fieldName" 
           class="pt-0 pb-0" xs12 sm12 >
            <v-text-field :multi-line="field.multiLine" :required="field.required" :rules="field.validationRules" name="" :label="$t(field.labelTextTKey)" v-model="enquiryContent[field.fieldName]"></v-text-field>
          </v-flex>
        </v-layout>
        <p v-if="propertyEnquiryErrors.length">
          <template v-for="error in propertyEnquiryErrors">
            <v-alert outline color="error" icon="warning" :value="true">
              {{error}}
            </v-alert>
          </template>
        </p>
        <p v-if="propertyEnquirySuccess.length">
          <v-alert outline color="success" dismissible v-model="successModel">
            {{ propertyEnquirySuccess }}
          </v-alert>
        </p>
        <v-flex xs12 sm12 offset-sm0>
          <template v-if="propertyEnquirySending">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </template>
          <v-btn class="primary" type="submit">Send</v-btn>
        </v-flex>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: ["propId"],
  data() {
    return {
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      // validationErrors: [],
      propertyEnquiryFields: [{
        labelTextTKey: "client.name",
        fieldName: "name",
        inputType: "text",
        validationRules: [
          v => !!v || 'Name is required',
        ]
      }, {
        labelTextTKey: "client.email",
        fieldName: "email",
        inputType: "text",
        required: true,
        validationRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }, {
        labelTextTKey: "client.tel",
        fieldName: "tel",
        inputType: "text",
        validationRules: [
        ]
      }, {
        labelTextTKey: "client.message",
        multiLine: true,
        fieldName: "message",
        inputType: "text",
        required: true,
        validationRules: [
          v => !!v || 'Message is required',
        ]
      }],
      enquiryContent: {
        // property_id: this.propId,
        // not quite sure how to get above to work
        name: "",
        message: ""
      }
    }
  },
  computed: {
    propertyEnquirySending() {
      return this.$store.state.formsStore.propertyEnquirySending
    },
    propertyEnquirySuccess() {
      return this.$store.state.formsStore.propertyEnquirySuccess
    },
    propertyEnquiryErrors() {
      return this.$store.state.formsStore.propertyEnquiryErrors
    },
  },
  methods: {
    onSubmitEnquiry() {
      this.enquiryContent.property_id = this.propId
      if (!this.formValid) {
        this.$refs.enqForm.validate()
        // in case nothing has been typed in, above will display error messages
        return
      }
      // var that = this

      this.$store.dispatch('sendPropertyEnquiry', this.enquiryContent)
      // TODO: ensure above is successfull before calling below:
      // this.pendingChanges = {}
      // this.hasPendingChanges = false
    }

  }
}

</script>
