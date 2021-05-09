import service from "@/router/request.js";
// 获取验证码
export  function GetSms(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL+'/v1/send',
        data:data
    })
}
// 注册
export  function Register(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL+'/v1/account/register',
        data:data
    })
}
// 登陆
export  function Login(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL+'/v1/account/login',
        data:data
    })
}
// 验证用户名
export  function Check(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL+'/v1/account/check',
        data:data
    })
}