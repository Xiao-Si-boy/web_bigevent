// 注意： 每次调用$.get() 或者$.post() 或$.ajax() 的时候都先调用ajaxPrefilter这个函数
// 在这个函数中， 可以拿到我们给Ajax提供的配置对象
// 拼接url地址
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口， 设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载， complete回调函数
    options.complete = function(res) {
        // 在cooplete可以使用res.responseJOSN拿到服务器返回来的数组
        if (res.responseJSON === 1 && res.responseJSON.message === '身份认知失败!') {
            // 1.强制清空token
            localStorage.removeItem('token')

            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})