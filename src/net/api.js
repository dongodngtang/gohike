const api = {
  production: 'http://115.159.121.224:8080/v1/',
  activities: 'activities',//发布活动
  comments: 'comments',//评论列表
  v_codes: 'account/v_codes',//获取验证码
  register: 'account/register',//注册
  login: 'account/login',//登录
  action_sign:action_sign
}

export default api

function action_sign(activity_id) {
  return `activities/${activity_id}/join`
}
