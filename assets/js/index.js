
// console.info(window.qbian.categories);

$(function() {

    var html = '',
        category;

    for(var key in window.qbian.categories) {
        // console.info(window.qbian.categories[key]);

        category = window.qbian.categories[key];

        html += '<ul>';

        if(category.articles.length === 0) {

            html += '<li>该类别 '+ category.title +' 暂无内容！</li>';

        } else {

            html += '<li>类别名称：'+ category.title +'</li>';

            for(var i = 0, len = category.articles.length; i < len; ++ i) {
                html += '<li>文章标题：《'+ category.articles[i].title +'》</li>';
            }

        }
        html += '</ul>';

    }

    $('#box').html(html);

});