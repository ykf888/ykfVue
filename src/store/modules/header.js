let state ={
  isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false
},
getters={
  isCollapse:state=>state.isCollapse
},
mutations={
  SET_COLLAPSE(state){
    state.isCollapse=!state.isCollapse
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    
  }
},
actions={
  
}
  export default {
    state,
    getters,
    mutations,
    actions,
  };
  