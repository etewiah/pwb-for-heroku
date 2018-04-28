import axios from 'axios'

// initial state
const state = {
  propertyEnquiryErrors: [],
  propertyEnquirySuccess: "",
  propertyEnquirySending: false,
  contactUsErrors: [],
  contactUsSuccess: "",
  contactUsSending: false,
}

// getters
const getters = {}

// actions
const actions = {
  sendContactMessage: function({ commit }, enquiryData) {
    commit('setContactUs', { result: "reset" })
    let apiUrl = this.getters.baseApiUrl + '/contact_us'
    axios.post(apiUrl, {
      contact: enquiryData
    }, {
    }).then(response => {
      commit('setContactUs', { result: response.data })
    }, (err) => {
      let errResult = {
        errors: [err.message]
      }
      commit('setContactUs', { result: errResult })
      console.log(err)
    })
  },
  sendPropertyEnquiry: function({ commit }, enquiryData) {
    commit('setPropertyEnquiry', { result: "reset" })
    let apiUrl = this.getters.baseApiUrl + '/request_property_info'
    axios.post(apiUrl, {
      contact: enquiryData
    }, {
      // headers: {
      //   // 'Content-Type': 'application/vnd.api+json',
      //   // 'Accept': 'application/vnd.api+json'
      // }
    }).then(response => {
      commit('setPropertyEnquiry', { result: response.data })
    }, (err) => {
      let errResult = {
        errors: [err]
      }
      commit('setPropertyEnquiry', { result: errResult })
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  setContactUs: (state, { result }) => {
    if (result === "reset") {
      state.contactUsErrors = []
      state.contactUsSuccess = ""
      state.contactUsSending = true
      return
    }
    state.contactUsSending = false
    if (result.success) {
      state.contactUsSuccess = result.success_message
    } else {
      state.contactUsErrors = result.errors || []
    }
  },
  setPropertyEnquiry: (state, { result }) => {
    if (result === "reset") {
      state.propertyEnquiryErrors = []
      state.propertyEnquirySuccess = ""
      state.propertyEnquirySending = true
      return
    }
    state.propertyEnquirySending = false
    if (result.success) {
      state.propertyEnquirySuccess = result.success_message
    } else {
      state.propertyEnquiryErrors = result.errors || []
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
