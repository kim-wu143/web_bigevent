$(function () {
    // 定义查询的参数对象以后每次发请求都要用
    var q = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: '',
    }


    initTable(q)
    initChoose()
    var laypage = layui.laypage;
    var form = layui.form
    var layer = layui.layer
    // 获取文章列表函数
    function initTable(q) {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl_art_list', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 时间修饰过滤器
    template.defaults.imports.setTime = function (value) {
        value = value.slice(0, 19)
        return value
    }

    // 渲染文章分类下拉菜单
    function initChoose() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl_art_choose', res)
                $('#artChooseBox').html(htmlStr)
                form.render()
            }
        })
    }

    // 筛选之后重新渲染列表
    $('#choose_form').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable(q)
    })

    // 渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'paging',
            count: total,
            limit: q.pagesize,
            limits: [2, 5, 10, 15, 20],
            curr: q.pagenum, //当前页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                q.pagesize = obj.limit
                q.pagenum = obj.curr
                if (!first) {
                    initTable(q)
                }
            }

        });
    }

    // 删除文章
    $('body').on('click', '.layui-btn-danger', function () {
        var len = $('.layui-btn-danger').length
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? q.pagenum : q.pagenum - 1
                    }
                    initTable(q)
                }
            })
            layer.close(index);
        });




    })
})