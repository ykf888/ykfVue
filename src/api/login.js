import service from "@/router/request.js";
// 获取验证码
export  function GetSms(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_API_URL+'/getCode/',
        data:data
    })
}