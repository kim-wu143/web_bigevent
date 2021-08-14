
$(function(){
    // 获取文章列表
    var layer = layui.layer
    initArticleList()
    // 渲染页面
    function initArticleList(){
        // 发起请求
        $.ajax({
            type:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('请求失败')
                }
                var htmlStr = template('tableContent',res);
                $('tbody').html(htmlStr)
            }
        })
    }



// 添加数据
    $('#btnAdd').on('click',function(){
        layer.open({
            area: ['500px', '250px'],
            type:1,
            title: '添加文章分类'
            ,content: $('#addForm').html()
          });    
    })
    // 代理绑定添加事件
    $('body').on('submit','#addForm_form',function(e){
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:data,
            success:function(res){
                if(res.status!==0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功', {
                  
                    time: 1000//2秒关闭（如果不配置，默认是3秒）
                },function(){
                    $('.layui-layer-close').click()
                })
                initArticleList()
            }
        })
    })



// 编辑数据
    // 代理绑定修改事件
    var indexEdit = null
    $('body').on('click','#btnEdit',function(){
        indexEdit = layer.open({
            area: ['500px', '250px'],
            type:1,
            title: '修改文章分类'
            ,content: $('#editForm').html()
          });    
         
        //   通过id发起ajax请求获取数据
        var id = $(this).attr('data-id')
        $.ajax({
            type:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取数据失败')
                }
                // 数据渲染到弹出框
                // console.log(res);
                $('#editId').val(res.data.Id)
                $('#editName').val(res.data.name)
                $('#editAlias').val(res.data.alias)
            }
        })
    })
      // 编辑表单提交监听事件
      $('body').on('submit','#editForm_form',function(e){
        e.preventDefault()
        // var data = $(this).serialize()
        // console.log($('#editId').val());
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:{
                Id:$('#editId').val()-0,
                name:$('#editName').val(),
                alias:$('#editAlias').val(),
            },
            success:function(res){
                if(res.status!==0) {
                    console.log(res);
                    return layer.msg('修改数据失败')
                } 
                layer.close(indexEdit)
                initArticleList()
            }
        })
    })


// 删除数据
    // 给删除按钮绑定事件
    $('body').on('click','#btnDel',function(e){
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            type:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除失败')
                }
                initArticleList()
            }
        })
    })
  
})