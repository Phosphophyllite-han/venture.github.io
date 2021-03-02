window.addEventListener('load', function() {

    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() { arrow_r.click(); }, 2000);
    })
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');

        //记录当前小圆圈索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) { ol.children[i].className = ''; }
            //把第一个il的设置为current

            this.className = 'current';

            var index = this.getAttribute('index');
            //把索引号给num,给circle
            num = index;
            circle = index;
            console.log(index);
            animate(ul, -index * focusWidth)
        })
    }
    //克隆最后一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    //控制小圆圈的播放
    var circle = 0;
    //设置节流阀
    var flag = true;
    //点击按钮，让图片滚动
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;

            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;

            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange() {
        //如果circle ==4 说明我们克隆了这张图片
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 2000);
})