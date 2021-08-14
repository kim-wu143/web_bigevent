$(function(){

$.ajaxPrefilter(function(options){

options.url='http://api-breakingnews-web.itheima.net'+options.url

// 给请求接口统一挂请求头
if(options.url.includes('/my')){
    options.headers={
                Authorization:localStorage.getItem('token')
            }
}

// 给所有ajax挂complete回调,如果非法登录，执行最后的回调函数，强制回到登录页面
options.complete=function(res){
    // console.log(res);
    if (res.responseJSON.status !== 0) {
        // 强制跳转
        // location.href = '/login.html'
        // 强制清空TOKEN
        // localStorage.removeItem('token')
    }
}

})

})