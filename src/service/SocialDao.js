import api from '../net/api'
import {get,post} from '../net/fetch'

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
