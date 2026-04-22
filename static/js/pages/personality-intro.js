(function () {
    function initPersonalityIntro() {
        // 这个脚本控制详情页首屏到正文的展开动画，并兼顾旧版 IE 的兼容判断。
        var ie = (function () {
            var undef;
            var rv = -1;
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            var trident = ua.indexOf('Trident/');

            if (msie > 0) {
                rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            } else if (trident > 0) {
                var rvNum = ua.indexOf('rv:');
                rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
            }

            return rv > -1 ? rv : undef;
        }());

        // 在首屏阶段暂时锁定滚动，避免用户还没展开正文就把页面滚走。
        var keys = [32, 37, 38, 39, 40];
        var docElem = window.document.documentElement;
        var scrollVal;
        var isRevealed;
        var noscroll;
        var isAnimating;
        var container = document.getElementById('article');
        var trigger = container ? container.querySelector('button.trigger') : null;

        if (!container || !trigger) {
            return;
        }

        function preventDefault(event) {
            var normalizedEvent = event || window.event;

            if (normalizedEvent.preventDefault) {
                normalizedEvent.preventDefault();
            }

            normalizedEvent.returnValue = false;
        }

        function keydown(event) {
            for (var index = keys.length; index--;) {
                if (event.keyCode === keys[index]) {
                    preventDefault(event);
                    return;
                }
            }
        }

        function touchmove(event) {
            preventDefault(event);
        }

        function wheel() {
            // 为旧版 IE 预留鼠标滚轮兼容入口。
        }

        function disableScroll() {
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
            document.body.ontouchmove = touchmove;
        }

        function enableScroll() {
            window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
        }

        function scrollY() {
            // 统一读取当前滚动值，兼容不同浏览器的实现差异。
            return window.pageYOffset || docElem.scrollTop;
        }

        function scrollPage() {
            scrollVal = scrollY();

            if (noscroll && !ie) {
                if (scrollVal < 0) {
                    return false;
                }

                window.scrollTo(0, 0);
            }

            if (container.classList.contains('notrans')) {
                container.classList.remove('notrans');
                return false;
            }

            if (isAnimating) {
                return false;
            }

            if (scrollVal <= 0 && isRevealed) {
                toggle(false);
            } else if (scrollVal > 0 && !isRevealed) {
                toggle(true);
            }
        }

        function toggle(reveal) {
            // modify 类名决定文章是否进入“正文展开”状态。
            isAnimating = true;

            if (reveal) {
                container.classList.add('modify');
            } else {
                noscroll = true;
                disableScroll();
                container.classList.remove('modify');
            }

            setTimeout(function () {
                isRevealed = !isRevealed;
                isAnimating = false;

                if (reveal) {
                    noscroll = false;
                    enableScroll();
                }
            }, 600);
        }

        // 刷新后如果页面已经有滚动位置，就直接恢复到展开态，避免视觉闪烁。
        var pageScroll = scrollY();
        noscroll = pageScroll === 0;

        disableScroll();

        if (pageScroll) {
            isRevealed = true;
            container.classList.add('notrans');
            container.classList.add('modify');
        }

        window.addEventListener('scroll', scrollPage);
        trigger.addEventListener('click', function () {
            toggle(true);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPersonalityIntro);
    } else {
        initPersonalityIntro();
    }
})();
