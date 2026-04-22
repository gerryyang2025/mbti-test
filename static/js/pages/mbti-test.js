(function () {
    var CIRCLE_PATH = 'M34.745,7.183C25.078,12.703,13.516,26.359,8.797,37.13 c-13.652,31.134,9.219,54.785,34.77,55.99c15.826,0.742,31.804-2.607,42.207-17.52c6.641-9.52,12.918-27.789,7.396-39.713 C85.873,20.155,69.828-5.347,41.802,13.379';
    var CIRCLE_ANIMATION = {
        speed: 0.2,
        easing: 'ease-in-out'
    };

    function initMBTIPage() {
        // 每道题都按索引记录答案，防止快速切换选项时重复记分。
        var answers = [];
        var currentQuestionIndex = 0;
        var questionContainer = document.getElementById('mbtiquestion');

        if (!questionContainer) {
            return;
        }

        function createQuestionMarkup(item, index, total) {
            var questionNumber = index + 1;
            var choiceAId = 'question-' + questionNumber + '-choice-a';
            var choiceBId = 'question-' + questionNumber + '-choice-b';

            return [
                '<form class="ac-custom ac-radio ac-circle" autocomplete="off" data-question-index="' + index + '">',
                '    <fieldset>',
                '        <legend>' + questionNumber + ' / ' + total + '. ' + item.question + '</legend>',
                '        <ul>',
                '            <li>',
                '                <input id="' + choiceAId + '" name="answer-' + questionNumber + '" value="' + item.choice_a.value + '" type="radio">',
                '                <label for="' + choiceAId + '">',
                '                    ' + item.choice_a.text,
                '                </label>',
                '            </li>',
                '            <li>',
                '                <input id="' + choiceBId + '" name="answer-' + questionNumber + '" value="' + item.choice_b.value + '" type="radio">',
                '                <label for="' + choiceBId + '">',
                '                    ' + item.choice_b.text,
                '                </label>',
                '            </li>',
                '        </ul>',
                '    </fieldset>',
                '</form>'
            ].join('');
        }

        function createSvgElement() {
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttributeNS(null, 'viewBox', '0 0 100 100');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            return svg;
        }

        function ensureSvgForRadio(radio) {
            var svg = radio.parentNode.querySelector('svg');

            if (!svg) {
                svg = createSvgElement();
                radio.parentNode.appendChild(svg);
            }

            return svg;
        }

        function resetRadioGroup(radio) {
            Array.prototype.slice.call(document.querySelectorAll('input[type="radio"][name="' + radio.getAttribute('name') + '"]')).forEach(function (item) {
                Array.prototype.slice.call(item.parentNode.querySelectorAll('svg > path')).forEach(function (path) {
                    path.parentNode.removeChild(path);
                });
            });
        }

        function drawAnimatedCircle(radio) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            var svg = ensureSvgForRadio(radio);

            svg.appendChild(path);
            path.setAttributeNS(null, 'd', CIRCLE_PATH);

            var length = path.getTotalLength();
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = Math.floor(length) - 1;
            path.getBoundingClientRect();
            path.style.transition = 'stroke-dashoffset ' + CIRCLE_ANIMATION.speed + 's ' + CIRCLE_ANIMATION.easing;
            path.style.strokeDashoffset = '0';
        }

        function setupAnimatedRadios(container) {
            Array.prototype.slice.call(container.querySelectorAll('form.ac-circle input[type="radio"]')).forEach(function (radio) {
                ensureSvgForRadio(radio);

                if (radio.dataset.animationBound === 'true') {
                    return;
                }

                radio.dataset.animationBound = 'true';
                radio.addEventListener('change', function () {
                    resetRadioGroup(radio);
                    drawAnimatedCircle(radio);
                });
            });
        }

        function renderQuestion(questionList, index) {
            questionContainer.innerHTML = createQuestionMarkup(questionList[index], index, questionList.length);
            setupAnimatedRadios(questionContainer);
        }

        function getAnsweredCount(answerList) {
            return answerList.filter(Boolean).length;
        }

        // 题库来自静态 JSON，页面本身不写死具体题目内容。
        window.MBTIData.loadQuestions()
            .then(function (questionList) {
                if (!Array.isArray(questionList) || questionList.length === 0) {
                    throw new Error('Question list is empty');
                }

                renderQuestion(questionList, currentQuestionIndex);

                // 整个答题过程复用一个 change 监听器，避免给每个 radio 单独绑事件。
                questionContainer.addEventListener('change', function (event) {
                    var target = event.target;

                    if (!(target instanceof HTMLInputElement) || target.type !== 'radio' || target.disabled) {
                        return;
                    }

                    var form = target.closest('form');
                    var questionIndex = form ? Number(form.getAttribute('data-question-index')) : -1;

                    if (!form || questionIndex < 0) {
                        return;
                    }

                    answers[questionIndex] = target.value;
                    Array.prototype.slice.call(form.querySelectorAll('input[type="radio"]')).forEach(function (input) {
                        input.disabled = true;
                    });

                    // 留出一点动画时间，再移除当前题并显示下一题。
                    setTimeout(function () {
                        currentQuestionIndex = questionIndex + 1;

                        if (getAnsweredCount(answers) === questionList.length) {
                            try {
                                // 所有题目答完后，立即计算人格类型并跳转到统一详情页。
                                var page = window.MBTIScoring.calculatePersonalityType(answers.filter(Boolean));
                                window.location.href = './personality-detail.html?type=' + encodeURIComponent(page);
                            } catch (error) {
                                alert('评分失败，请刷新页面后重试。');
                            }

                            return;
                        }

                        renderQuestion(questionList, currentQuestionIndex);
                    }, 520);
                });
            })
            .catch(function (error) {
                if (globalThis.console && typeof globalThis.console.error === 'function') {
                    globalThis.console.error(error);
                }

                // 如果题库请求失败，直接在容器里显示错误提示，避免页面空白。
                questionContainer.innerHTML = '<p>题库加载失败，请稍后重试。</p>';
            });
    }

    // mbti-test.js 在 head 中加载，因此必须等 DOM 建好后再寻找题目容器并开始渲染。
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMBTIPage);
    } else {
        initMBTIPage();
    }
})();
