$(function() {
    //点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击登录页面的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义表单验证规则，从layui
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义规则
    form.verify({
        // 自定义了pwd的规则  \S  不是空格
        'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框的内容
            // 还需要拿到密码框中的内容
            // 两个内容进行判断是否一致
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交时间
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
                // 发起ajax的post请求
            $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                //模拟人的点击事件
                $('#link_login').click()

            })

        })
        // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止事件的默认行为
        e.preventDefault()
            // 发起ajax的请求
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/login',
            data: $(this).serialize(), //快速获取表单元素内容
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 登录成功之后将token的字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                    //跳转到后台主页 index.html
                location.href = "/index.html"
            }
        })


    })
})