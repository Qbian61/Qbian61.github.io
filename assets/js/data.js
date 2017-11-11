
window.qbian = window.qbian || {};
window.qbian.categories = window.qbian.categories || {};


(function(window) {

    // 所有标签
    var tags = {
        java: {
            title: 'java',
            color: '#CC0066'
        },
        docker: {
            title: 'docker',
            color: '#990066'
        },
        elesticSearch: {
            title: 'elesticSearch',
            color: '#009933'
        },
        git: {
            title: 'git',
            color: '#2196f3'
        },
        javaScript: {
            title: 'javaScript',
            color: '#2196f3'
        },
        mq: {
            title: 'mq',
            color: '#00abc0'
        },
        nginx: {
            title: 'nginx',
            color: '#f44336'
        },
        gossip: {
            title: '杂谈',
            color: '#673ab7'
        },
        designPattern: {
            title: '设计模式',
            color: '#ff9800'
        },
        angular: {
            title: 'angularJs',
            color: '#8bc34a'
        }
    };
    
    // 所有类别
    window.qbian.categories = {
        docker: {
            title: 'Docker',
            desc: 'Docker 学习笔记',
            img: './resource/category-logo/docker.png',
            readme: '',
            articles: []
        },
        elesticSearch: {
            title: 'ElesticSearch',
            desc: 'es 学习笔记',
            img: './resource/category-logo/ElasticSearch.png',
            readme: '',
            articles: []
        },
        git: {
            title: 'Git',
            desc: 'Git 学习笔记',
            img: './resource/category-logo/git.png',
            readme: '',
            articles: []
        },
        java: {
            title: 'Java',
            desc: 'Java 学习笔记',
            img: './resource/category-logo/java.jpg',
            readme: '',
            articles: []
        },
        javaScript: {
            title: 'JavaScript',
            desc: 'js 学习笔记',
            img: './resource/category-logo/JavaScript.png',
            readme: '',
            articles: [{
                title: 'JS this取值的四种模式',
                category: 'JavaScript',
                created: '2017-09-29',
                desc: 'js中的 this 在四种不同情况下会有不同的取值方式，具体的四种取值方式都是啥？',
                tags: [tags.javaScript],
                path: './src/mds/JavaScript/JS this取值的四种模式.md'
            }]
        },
        mq: {
            title: 'MQ',
            desc: '中间件相关学习笔记',
            img: './resource/category-logo/mq.png',
            readme: '',
            articles: []
        },
        nginx: {
            title: 'Nginx',
            desc: 'Nginx 学习笔记',
            img: './resource/category-logo/nginx.png',
            readme: '',
            articles: []
        },
        nodeJs: {
            title: 'NodeJs',
            desc: 'NodeJs 学习笔记',
            img: './resource/category-logo/NodeJs.jpg',
            readme: '',
            articles: []
        },
        // 杂谈
        gossip: {
            title: '杂谈',
            desc: '随便聊聊',
            img: './resource/category-logo/杂谈.jpeg',
            readme: '',
            articles: []
        },
        // 设计模式
        designPattern: {
            title: '设计模式',
            desc: '设计模式相关学习笔记',
            img: './resource/category-logo/设计模式.png',
            readme: '',
            articles: []
        },
    };

    // console.info('categories ===== ', window.qbian.categories)

})(window);