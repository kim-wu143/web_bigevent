$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#quit').on('click', function () {
        layer.confirm('确认是否退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储
            localStorage.removeItem('token')
            // 2.回到登录页面
            location.href = '/login.html'
            layer.close(index)
        });
    })
})

// 渲染用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message, {
                    icon: 2,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                })
            } else {
                console.log(res);
                renderAvater(res.data)
            }
        },
    })
}

// 渲染头像
function renderAvater(user) {
    // 设置昵称名
    var name = user.nickname || user.username
    // 渲染昵称
    $('#welcome').text('欢迎 ' + name)
    // 渲染头像
    if (user.user_pic) {
        $('.userinfo img').prop('src', user.user_pic).show().siblings('.text_avater').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.userinfo img').hide().siblings('.text_avater').show().text(first)
    }
}