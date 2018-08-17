import api from '../net/api'
import {get,post} from '../net/fetch'

export function activityDetail(id,resolve,reject){
    get(api.activities+`/${id}`,{},ret=>{
        resolve(ret.data)
    },reject)
}

export function comments(id,resolve,reject){
    get(api.activities+`/${id}`,{},ret=>{
        resolve(ret.data)
    },reject)
}