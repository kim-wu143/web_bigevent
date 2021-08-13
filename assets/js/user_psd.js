$(function(){
    var form =layui.form
    var layer = layui.layer

    // 密码正则
    form.verify({
        password:function(value){
            if(!/^\d{6,16}$/.test(value)){
                return '密码必须是6-16位数字组成';
              }
        },
        renewPwd:function(value){
            if(value!=$('#newPwd').val()){
                return '两次输入密码不一致，请重新输入'
            }
        }
    })

    // 表单提交密码修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.post({
            type:'POST',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })


})