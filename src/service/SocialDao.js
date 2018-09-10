import api from '../net/api'
import {get, post, setToken} from '../net/fetch'
import {isStrNull, showToast, setUser} from "../net/utils";
import * as md5 from '../net/md5'

export function v_code(body, resolve, reject) {
  post(api.v_codes, body, ret => {
    showToast('验证码已发送')
    resolve(ret)
  }, reject)
}


function handleLoginInfo(loginUser) {
  setUser(loginUser)
  setToken(loginUser.access_token)
}

export function postRegister(body, resolve, reject) {
  if (!isStrNull(body.password))
    body.password = md5.hex_md5(body.password)
  post(api.register, body, data => {
    let loginUser = ret.data;
    handleLoginInfo(loginUser)
    resolve(data)
  }, reject)
}

export function postLogin(body, resolve, reject) {
  if (!isStrNull(body.password))
    body.password = md5.hex_md5(body.password)
  post(api.login, body, ret => {
    let loginUser = ret.data;
    handleLoginInfo(loginUser)
    resolve(loginUser)
  }, reject)
}


export function activityDetail(id, resolve, reject) {
  get(api.activities + `/${id}`, {}, ret => {
    resolve(ret.data)
  }, reject)
}

export function comments(body, resolve, reject) {
  get(api.comments, body, ret => {
    resolve(ret.data)
  }, reject)
}

export function action_sign(body, resolve, reject) {
  post(api.action_sign(body.id), body, ret => {
    resolve(ret.data)
  }, reject)
}

export function put_action_sign(body, resolve, reject) {
  put(api.put_action_sign(body), body, ret => {
    resolve(ret.data)
  }, reject)
}