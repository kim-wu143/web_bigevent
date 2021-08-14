$(function () {
    var layer = layui.layer
    var form = layui.form
    loadTpye()
    initEditor()

    // 导入文章类别
    function loadTpye() {
        // 发起请求
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl_type', res)
                $('#pub_option').html(htmlStr)
                form.render()

            }
        })
    }

    // 图片剪裁
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //   给button点击事件传给file
    $('#qrimg').on('click', function (e) {
        $('#coverfile').click()
    })
    $('#coverfile').on('change', function (e) {
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // 提交属性整理

    // 1.state属性
    var pub_state = '已发布'
    $('#btnCg').on('click', function () {
        pub_state = '草稿'
    })

    // 2.前三个属性通过formdata
    $('#pub_form').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($('#pub_form')[0])
        fd.append('state', pub_state)


        // 3.存图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                
                // 发AJAX上传文件
                articlePub(fd)
            })
    })

    function articlePub(fd) {
      
        $.ajax({
            type:'POST',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('发布失败')
                } else {
                    console.log(res);
                    layer.msg('发布成功',function(){
                        location.href='/article/article_list.html'
                    })
                }
                
                
               

            }
        })
    }

})