import service from "@/router/request.js";

const requestUrl ={
    getTableDate:'/v1/user/lists'
}

export  function getList(prome){
    return service.request({
        method:prome.method || "post",
        url:process.env.VUE_APP_URL_USER+prome.url,
        data:prome.data||{}
    })
}
export{requestUrl}