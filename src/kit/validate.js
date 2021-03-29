// 验证特殊字符
export function stripscript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#%￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    let rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
// 验证手机号
export function checkIphone(value){
    let reg=/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    return reg.test(value)
}
// 验证密码
export function checkPassword(value){
    let reg=/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return reg.test(value)
}
// 验证验证码
export function checkVerification(value){
    let reg=/^[a-z0-9]{6}$/;
    return reg.test(value)
}

