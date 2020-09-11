$(function() {
    //调用getUserInfo()
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function() {

        // 提示用户是否退出

        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something

            //清空本地存储的token
            localStorage.removeItem('token')

            // 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭confirm询问框
            layer.close(index);
        })
    })
})

// 获取用户的信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // 请求头的配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染用户头像的函数
            renderAvater(res.data)
        },

        // 控制用户的输入权限
        // 无论成功还是失败都会调用complete这个函数
        // complete: function(res) {

        // }
    })
}

// 渲染用户的头像
function renderAvater(user) {
    // 获取用户的名称
    var name = user.nickname || user.user.name
        // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
            // toUpperCase  字母转换成大写
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}