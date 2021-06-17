import service from "@/router/request.js";
// 获取用户列表
export  function GetUserList(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL_USER+'/v1/user/lists',
        data:data
    })
}
// 添加用户
export  function AddUser(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL_USER+'/v1/user/create',
        data:data
    })
}
// 用户详情
export  function UserInfo(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL_USER+'/v1/user/info',
        data:data
    })
}
// 用户编辑
export  function UserUpdate(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL_USER+'/v1/user/update',
        data:data
    })
}
// 用户删除
export  function UserRemove(data){
    return service.request({
        method:'post',
        url:process.env.VUE_APP_URL_USER+'/v1/user/remove ',
        data:data
    })
}
