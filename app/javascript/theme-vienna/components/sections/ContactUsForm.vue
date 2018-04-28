<template>
  <transition name="slide-in-left">
    <v-card v-if="showTrans" class="elevation-2">
      <v-card-title primary-title class="layout">
        <div class="headline ml-2">
          {{ $t("client.contactUsPrompt") }}:
        </div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="formValid" ref="enqForm" lazy-validation @submit.prevent="onSubmitEnquiry">
          <v-layout v-for="(field) in contactUsFields" :key="field.fieldName" row>
            <v-flex xs12 sm12 offset-sm0>
              <v-text-field :autofocus="field.autofocus" :multi-line="field.multiLine" :required="field.required" :rules="field.validationRules" name="" :label="$t(field.labelTextTKey)" v-model="enquiryContent[field.fieldName]"></v-text-field>
            </v-flex>
          </v-layout>
          <p v-if="contactUsErrors.length">
            <template v-for="error in contactUsErrors">
              <v-alert outline color="error" icon="warning" :value="true">
                {{error}}
              </v-alert>
            </template>
          </p>
          <p v-if="contactUsSuccess.length">
            <v-alert outline color="success" dismissible v-model="successModel">
              {{ contactUsSuccess }}
            </v-alert>
          </p>
          <v-flex xs12 sm12 offset-sm0>
            <template v-if="contactUsSending">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </template>
            <v-btn class="accent" type="submit">
            {{$t("client.send") }}
            </v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </transition>
</template>
<style>
@keyframes slide-in-left {
  0% {
    transform: scale(0);
    left: -1000px;
  }
  80% {
    transform: scale(0.9);
  }
  100% {
    left: 0;
    transform: scale(1);
  }
}
.slide-in-left-enter-active {
  animation: slide-in-left 0.5s;
}
.slide-in-left-leave-active {
  animation: slide-in-left 0.5s reverse;
}

</style>
<script>
export default {
  components: {},
  props: [],
  mounted: function() {
    var that = this
    setTimeout(function() {
      // debugger
      that.showTrans = true
    }, 500)
  },
  data() {
    return {
      showTrans: false,
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      // validationErrors: [],
      contactUsFields: [{
        labelTextTKey: "client.name",
        autofocus: true,
        fieldName: "name",
        inputType: "text",
        required: true,
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
        validationRules: []
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
        name: "",
        message: ""
      }
    }
  },
  computed: {
    contactUsSending() {
      return this.$store.state.formsStore.contactUsSending
    },
    contactUsSuccess() {
      return this.$store.state.formsStore.contactUsSuccess
    },
    contactUsErrors() {
      return this.$store.state.formsStore.contactUsErrors
    },
  },
  methods: {
    onSubmitEnquiry() {
      // this.enquiryContent.property_id = this.propId
      if (!this.formValid) {
        this.$refs.enqForm.validate()
        // in case nothing has been typed in, above will display error messages
        return
      }
      this.$store.dispatch('sendContactMessage', this.enquiryContent)
      // TODO: ensure above is successfull before calling below:
      // this.pendingChanges = {}
      // this.hasPendingChanges = false
    }

  }
}

</script>
