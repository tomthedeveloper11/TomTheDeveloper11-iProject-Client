import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packages: [],
    cart: []
  },
  getters: {
    getCart(state){
      return state.cart
    }
  },
  mutations: {
    setPackages(state, payload) {
      state.packages = payload
    },
    addToCart(state, payload) {
      state.cart.push(payload)
    },
  },
  actions: {
    async doLogin(context, loginData) {
      try {
        const response = await axios.post('http://localhost:3000/login', loginData)

        const {
          access_token
        } = response.data

        localStorage.setItem('access_token', access_token)
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPackages(context) {
      try {
        const response = await axios.get('http://localhost:3000/packages', {
          headers: {
            'access_token': localStorage.access_token
          }
        })
        response.data.sort((a, b) => a.id > b.id ? 1 : -1);
        context.commit('setPackages', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async doXenditPay({getters}) {
      try {
        let data = {
          "external_id": "invoice-1",
          "amount": 0,
          "customer": {
            "given_names": "Tommy",
            "email": "tomthedeveloper11@gmail.com",
            "mobile_number": "08123234586",
            "address": {
              "city": "Medan",
              "country": "Indonesia"
            }
          },
          "items": [],
          "description": "Invoice Demo #123",
        }
        const cartItems = getters.getCart

        cartItems.forEach((item) => {
          data.amount += item.price
          data.items.push({
            "name": item.name,
            "quantity": 1,
            "price": item.price,
            "description": item.description
          })
        });
       
        const response = await axios.post('http://localhost:3000/xenditPay', data, {
          headers: {
            'access_token': localStorage.access_token
          }
        })

        return response.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {}
})