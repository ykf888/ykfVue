import Router from "./index"
import{remove_token,remove_tusername,get_token}from"@/kit/cookieData"
const whiterouter=['/login','/registered','/forgotPasd']
Router.beforeEach((to,from,netx)=>{
  if (get_token()) {
    if (to.path==='/login') {
      remove_token()
      remove_tusername()
    }
    netx()
  }else{
    if (whiterouter.indexOf(to.path)!==-1) {
      netx()
    }else{
      netx('/login')
    }
  }
})


