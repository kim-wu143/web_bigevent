$(function () {
    var form = layui.form
    var layer = layui.layer
    // 表单规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称名在1-6个字符之间'
            }
        }
    })

    // 初始化用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                form.val('userform', res.data)
            }
        })
    }

    // 重置按钮绑定事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:function(res){
               if(res.status!==0){
                   return layer.msg('提交失败')
               } 
               layer.msg('修改成功')
               window.parent.getUserInfo()
            }
                
            
        })



    })
})