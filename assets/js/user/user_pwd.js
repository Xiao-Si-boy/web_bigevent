$(function() {
    var form = layui.form


    // 自定义规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 新密码和旧密码不能相同规则
            samePwd: function(value) {
                if (value === $('[name=oldPwd').val()) {
                    return '新旧密码不能相同'
                }
            },

            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码不一致！'
                }
            }

        })
        // 表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                    //重置表单  表单的reset方法，可以重置表单，就是清空表单内容
                $('.layui-form')[0].reset()
            }

        })
    })

})