import api from '../net/api'
import {get,post} from '../net/fetch'
import {isStrNull, showToast} from "../net/utils";
import * as md5 from '../net/md5'

export function v_code(body, resolve, reject) {
  post(api.v_codes, body, ret => {
    showToast('验证码已发送')
    resolve(ret)
  }, reject)
}


export function register(body, resolve, reject) {
  if (!isStrNull(body.password))
    body.password = md5.hex_md5(body.password)
  post(api.register, body, data => {
    let loginUser = ret.data;
    showToast('恭喜您注册成功')
    resolve(data)
  }, reject)
}

export function login(body, resolve, reject) {
  if (!isStrNull(body.password))
    body.password = md5.hex_md5(body.password)
  post(api.login, body, ret => {
    let loginUser = ret.data;

    resolve(loginUser)
  }, reject)
}


export function activityDetail(id,resolve,reject){
    get(api.activities+`/${id}`,{},ret=>{
        resolve(ret.data)
    },reject)
}

export function comments(body,resolve,reject){
    get(api.comments,body,ret=>{
        resolve(ret.data)
    },reject)
}
