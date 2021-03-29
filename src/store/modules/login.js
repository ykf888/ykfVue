import { set_token, set_username,remove_tusername,remove_token,get_token,get_username } from "@/kit/cookieData"
import { Promise } from "core-js"
let state = {
  token: get_token() ||'',
  username: get_username() || ''
},
  getters = {
    token: state => state.token,
  },
  mutations = {
    SET_TOKEN(state,val) {
      state.token=val
    },
    SET_USERNAME(state,val){
      state.username=val
    }
  },
  actions = {
    login({ commit }) {
      let data = {
        token:'ttttttoken',
        username:'13335802671'
      }
      return new Promise((resolve,reject)=>{
        commit('SET_TOKEN', data.token)
        commit('SET_USERNAME', data.username)
        set_token(data.token)
        set_username(data.username)
        console.log(state.username)
        resolve()
      })

    },
    exit({ commit }) {
      return new Promise((resolve, reject) => {
        remove_token()
        remove_tusername()
        commit('SET_TOKEN','')
        commit('SET_USERNAME', '')
        resolve()
      })
    }
  }
export default {
  state,
  getters,
  mutations,
  actions,
};
