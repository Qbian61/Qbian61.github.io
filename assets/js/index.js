
$(function() {

    (function() {
        var html = '',
            category;

        for(var key in window.qbian.categories) {
            // console.info(window.qbian.categories[key]);

            category = window.qbian.categories[key];

            html += '<ul>';

            if(category.articles.length === 0) {

                html += '<li>该类别 '+ category.title +' 暂无内容！</li>';

            } else {

                html += '<li>类别名称：<h3>'+ category.title +'</h3></li>';
                html += '<ol>';

                for(var i = 0, len = category.articles.length; i < len; ++ i) {
                    html += '<li>《<a class="article" data-path="' + category.articles[i].path
                        +'" data-category="'+ key +'" data-index="'+ i +'">'+ category.articles[i].title +'</a>》</li>';
                }
                html += '</ol>';

            }
            html += '</ul>';
        }

        /**
         * 将所有文章添加到页面
         */
        $('#box').html(html);

        /**
         * 文章详情点击事件
         */
        $('.article').on('click', function() {
            var category = window.qbian.categories[$(this).data('category')],
                article = window.qbian.categories[$(this).data('category')]['articles'][$(this).data('index')];

            // console.info('category=', category);
            console.info('article=', article);

            $('#title').html('[ 标题: ' + article.title + ' ]');
            $('#category').html('[ 所属类别: ' + article.category + ' ]');
            $('#created').html('[ 创建日期: ' + article.created + ' ]');

            var tag = '[ 所属标签: ';
            for(var i = 0, len = article.tags.length; i < len; ++ i) {
                // console.info('tag=', );
                tag += '<span class="tag" style="background-color:' + article.tags[i].color
                + ';">' + article.tags[i].title + '</span>';
            }
            $('#tags').html(tag + ']');

            fetchArticle($(this).data('path'));
        });
    })();
    

    /**
     * @desc 获取 markdown 格式文件，并解析
     * @param {markdown 文件路径} path 
     */
    function fetchArticle(path) {
        $.ajax({
            method: 'GET',
            url: path,
            contentType: 'text/plain',
            success: function(response) {
                // console.info('[before]response info', response);
                // 解析 md 文件
                $('#article').html(window.marked.parse(response));
    
                // 添加评论
                // addMent(name);
    
                // 添加样式
                setTimeout(function() {
                    $('pre code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                }, 10);
            }
        });
    }

    /**
     * @desc 添加评论 gitment
     * @param {文章惟一 ID} articleId 
     */
    function addMent(articleId) {
        var gitment = new Gitment({
            id: location.href + articleId, // 可选。默认为 location.href
            owner: 'Qbian61',
            repo: 'Qbian61.github.io',
            oauth: {
                client_id: '35ce006293e40619b777',
                client_secret: '8228975f4b9a1da3c42342e539231d4e9cd99b5d'
            }
        });
        gitment.render('container');
    }


});