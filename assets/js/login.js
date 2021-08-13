$(function () {

    // 注册登录页面切换
    $('.login_a').on('click', function () {
        $(this).parents('.login_b').hide().siblings('.login_b').show()
    }).eq(1).click()

    //注册登录正则验证
    var layer = layui.layer
    var form = layui.form
    form.verify({

        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repassword: function (value) {
            // 判断注册的时候两次输入密码一样
            if (value !== $('.zc_box [name="password"]').val()) {
                return '两次密码不一致';
            }
        }
    })

    // 注册提交数据,通过监听表单实现
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                }
                    layer.msg('注册成功，请登录', {
                        icon: 1,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        $('.login_a').eq(1).click()
                    });
                


            })
    })

    // 登录提交数据 ajax
    $('#form_log').on('submit',function(e){
        e.preventDefault()
        var data = {
            username:$('.dl_box [name=username]').val(),
            password:$('.dl_box [name=password]').val(),
        }
        $.post('/api/login',
        data,
        function(res){
        if(res.status!==0){
            return layer.msg(res.message, {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            })
        }
        console.log(res);
        layer.msg('登陆成功', {
            icon: 1,
            time: 2000 //2秒关闭（如果不配置，默认是3秒）
        }, function () {
            console.log(res);
            localStorage.setItem('token',res.token)
            location.href='/index.html'
        });
        })
    })


})