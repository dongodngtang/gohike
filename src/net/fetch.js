/**
 * fetch.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/8/17.
 *
 */

import Taro from '@tarojs/taro'
import api from './api'
import { isStrNull, logMsg, showToast } from './utils';

let base = api.production
export function get(url,body,resolve,reject){
    Taro.request({
        url:base+url,
        method:'GET',
        data:body
    }).then(res=>{
        logMsg(`[${url}]`,res)
        handle(res,resolve,reject)
    }).catch(err=>{
        logMsg(`[${url}]`,err)
        errReject(err)
    })
}

export function post(url,body,resolve,reject){
    Taro.request({
        url:base+url,
        method:'POST',
        data:body
    }).then(res=>{
        logMsg(`[${url}]`,res)
        handle(res,resolve,reject)
    }).catch(err=>{
        logMsg(`[${url}]`,err)
        errReject(err)
    })
}

function handle(res, resolve, reject) {
   
    const { statusCode, data} = res;
    if ( statusCode === 200 && data.code === 0) {
        resolve && resolve(data)
    } else {
        if (data && !isStrNull(data.msg))
            showToast(data.msg)
        reject && reject(data.msg);
        errReject(res)
    }
}

function errReject(res) {
    const {statusCode, problem, data} = res;
    logMsg(res)
}