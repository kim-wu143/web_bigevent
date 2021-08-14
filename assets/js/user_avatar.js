// 图片裁剪
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

//   绑定上传点击事件
$('#btn_upload').on('click',function(e){
    $('#file1').click()
})

// 给inputfile绑定change事件
var layer = layui.layer
$('#file1').on('change',function(e){
    if(e.target.files.length===0) {
        return layer.msg('请选择图片')
    }
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   
})

$('#btn_submit').on('click',function(e){
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //   上传ajax
    $.ajax({
        type:'POST',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        success:function(res){
           if(res.status!==0) {
               return layer.msg('更换失败')
           }
           console.log(res);
           layer.msg('更换成功')
           window.parent.getUserInfo()
        }
    })

})