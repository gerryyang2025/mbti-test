(function () {
    function initPersonalityDetail() {
        // 这些 DOM 节点是详情页渲染的核心出口，任何一个缺失都直接中止执行。
        var typeElement = document.getElementById('personality-type');
        var subtitleElement = document.getElementById('personality-subtitle');
        var contentElement = document.getElementById('personality-content');
        var personalityType = getQueryType();

        if (!typeElement || !subtitleElement || !contentElement) {
            return;
        }

        if (!personalityType) {
            renderError('缺少人格类型参数。', subtitleElement, contentElement);
            return;
        }

        // 详情页按人格类型加载独立数据文件，file:// 环境下回退到 JS 数据文件。
        window.MBTIData.loadPersonalityDetail(personalityType)
            .then(function (personality) {
                typeElement.textContent = personality.type;
                subtitleElement.textContent = personality.subtitle || '人格详情';
                contentElement.innerHTML = personality.contentHtml || '<p>暂无人格详情内容。</p>';

                // 页面标题与 meta 描述跟随人格切换，方便搜索结果和分享卡片显示正确信息。
                document.title = personality.type + ' | MBTI 人格详情';
                updateMeta('meta[property="og:title"]', personality.type + ' | MBTI 人格详情');
                updateMeta('meta[property="og:description"]', personality.description || personality.subtitle || '查看 MBTI 各人格类型的详细解析。');
                updateMeta('meta[name="description"]', personality.description || personality.subtitle || '查看 MBTI 各人格类型的详细解析。');
            })
            .catch(function (error) {
                if (globalThis.console && typeof globalThis.console.error === 'function') {
                    globalThis.console.error(error);
                }

                if (error && /404|Not found/i.test(error.message)) {
                    renderError('未找到对应的人格类型。', subtitleElement, contentElement);
                    return;
                }

                renderError('人格数据加载失败，请稍后重试。', subtitleElement, contentElement);
            });
    }

    function getQueryType() {
        // 详情页通过 ?type=INTJ 这样的查询参数决定要读取哪一条人格数据。
        var rawType = new URLSearchParams(window.location.search).get('type');
        var normalizedType = rawType ? rawType.toUpperCase() : '';
        return /^[A-Z]{4}$/.test(normalizedType) ? normalizedType : '';
    }

    function updateMeta(selector, content) {
        // 同步更新标题和描述，便于 SEO 与社交分享展示正确的人格信息。
        var element = document.querySelector(selector);

        if (element) {
            element.setAttribute('content', content);
        }
    }

    function renderError(message, subtitleElement, contentElement) {
        // 错误状态下仍保留页面结构，只替换副标题和正文内容。
        subtitleElement.textContent = message;
        contentElement.innerHTML = '<p>' + message + '</p>';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPersonalityDetail);
    } else {
        initPersonalityDetail();
    }
})();
