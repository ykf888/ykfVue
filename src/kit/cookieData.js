import cookie from 'cookie_js'
const username='username'
const token ='token'
export function set_token(value){
    return cookie.set(token,value)
}
export function get_token(){
    return cookie.get(token)
}
export function remove_token(){
    cookie.remove(token)
}
export function set_username(value){
    return cookie.set(username,value)
}
export function get_username(){
    return cookie.get('username')
}
export function remove_tusername(){
    cookie.remove(username)
}