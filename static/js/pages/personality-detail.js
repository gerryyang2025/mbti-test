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
                enhancePersonalityContent(contentElement, personality);

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

    function enhancePersonalityContent(contentElement, personality) {
        var sections = extractSections(contentElement);
        var topBlock;
        var sectionsBlock;

        contentElement.classList.add('detail-reading');

        if (!sections.length) {
            return;
        }

        topBlock = buildTopBlock(personality, sections);
        sectionsBlock = buildSectionsBlock(sections);

        contentElement.innerHTML = '';
        contentElement.appendChild(topBlock);
        contentElement.appendChild(sectionsBlock);
    }

    function extractSections(contentElement) {
        var nodes = Array.prototype.slice.call(contentElement.childNodes).filter(function (node) {
            return node.nodeType !== Node.TEXT_NODE || node.textContent.trim() !== '';
        });
        var sections = [];
        var currentSection = null;

        nodes.forEach(function (node) {
            if (isHeading(node)) {
                currentSection = {
                    id: 'detail-section-' + (sections.length + 1),
                    title: node.textContent.trim(),
                    nodes: []
                };
                sections.push(currentSection);
                return;
            }

            if (!currentSection) {
                currentSection = {
                    id: 'detail-section-1',
                    title: '概览',
                    nodes: []
                };
                sections.push(currentSection);
            }

            currentSection.nodes.push(node);
        });

        return sections;
    }

    function isHeading(node) {
        return node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'h3';
    }

    function buildTopBlock(personality, sections) {
        var wrapper = createElement('section', 'detail-top-block');
        var summaryCard = createElement('div', 'detail-summary-card');
        var summaryBadge = createElement('p', 'detail-mini-label', '快速阅读');
        var summaryTitle = createElement('h2', 'detail-summary-title', personality.type + ' · ' + (personality.subtitle || '人格详情'));
        var summaryText = createElement('p', 'detail-summary-text', buildSummaryText(personality, sections));
        var metaList = createElement('div', 'detail-meta-list');
        var navCard = createElement('nav', 'detail-jump-nav');
        var navBadge = createElement('p', 'detail-mini-label', '章节导览');
        var navList = createElement('div', 'detail-jump-links');

        metaList.appendChild(createElement('span', 'detail-meta-pill', sections.length + ' 个章节'));
        metaList.appendChild(createElement('span', 'detail-meta-pill', '结果仅供参考'));

        summaryCard.appendChild(summaryBadge);
        summaryCard.appendChild(summaryTitle);
        summaryCard.appendChild(summaryText);
        summaryCard.appendChild(metaList);

        navCard.appendChild(navBadge);
        sections.forEach(function (section, index) {
            var link = createElement('a', 'detail-jump-link', (index + 1) + '. ' + section.title);

            link.setAttribute('href', '#' + section.id);
            navList.appendChild(link);
        });
        navCard.appendChild(navList);

        wrapper.appendChild(summaryCard);
        wrapper.appendChild(navCard);

        return wrapper;
    }

    function buildSummaryText(personality, sections) {
        var fallbackText = sections[0] && sections[0].nodes[0] ? normalizeText(sections[0].nodes[0].textContent || '') : '';
        var rawText = normalizeText(personality.description || fallbackText || personality.subtitle || '该人格详情包含性格概览、优势弱点与适配方向等内容。');

        rawText = rawText.replace(/^概览\s*/i, '');

        if (rawText.length > 120) {
            rawText = rawText.slice(0, 120).replace(/[，、；：,.!?！？]?[^\s]*$/, '') + '…';
        }

        return rawText;
    }

    function buildSectionsBlock(sections) {
        var wrapper = createElement('div', 'detail-sections');

        sections.forEach(function (section, index) {
            var sectionElement = createSectionElement(section, index);
            wrapper.appendChild(sectionElement);
        });

        return wrapper;
    }

    function createSectionElement(section, index) {
        var sectionElement = createElement('section', 'detail-section');
        var header = createElement('header', 'detail-section-header');
        var indexBadge = createElement('span', 'detail-section-index', padNumber(index + 1));
        var title = createElement('h3', 'detail-section-title', section.title);
        var body = createElement('div', 'detail-section-body');

        sectionElement.id = section.id;
        sectionElement.setAttribute('data-tone', inferSectionTone(section.title));

        header.appendChild(indexBadge);
        header.appendChild(title);

        section.nodes.forEach(function (node) {
            body.appendChild(node);
        });

        applyBodyEnhancements(body, index === 0);

        sectionElement.appendChild(header);
        sectionElement.appendChild(body);

        return sectionElement;
    }

    function applyBodyEnhancements(body, isFirstSection) {
        var paragraphs = Array.prototype.slice.call(body.children).filter(function (child) {
            return child.tagName && child.tagName.toLowerCase() === 'p';
        });

        if (paragraphs[0]) {
            paragraphs[0].classList.add(isFirstSection ? 'detail-lead' : 'detail-opening');
        }

        paragraphs.forEach(function (paragraph) {
            var text = normalizeText(paragraph.textContent);

            if (paragraph.querySelector('strong')) {
                paragraph.classList.add('detail-emphasis');
            }

            if (text.length > 0 && text.length <= 32) {
                paragraph.classList.add('detail-brief');
            }
        });

        transformCompactParagraphs(body, paragraphs);
    }

    function transformCompactParagraphs(body, paragraphs) {
        var compactParagraphs = paragraphs.filter(function (paragraph) {
            return paragraph.parentNode === body;
        });
        var shouldConvert = compactParagraphs.length >= 4 && compactParagraphs.length === body.children.length;

        if (!shouldConvert) {
            return;
        }

        shouldConvert = compactParagraphs.every(function (paragraph) {
            var text = normalizeText(paragraph.textContent);

            return isCompactLine(text);
        });

        if (!shouldConvert) {
            return;
        }

        body.innerHTML = '';
        body.appendChild(buildCompactList(compactParagraphs));
    }

    function buildCompactList(paragraphs) {
        var list = createElement('ul', 'detail-bullet-list');

        paragraphs.forEach(function (paragraph) {
            var item = createElement('li', 'detail-bullet-item');

            item.innerHTML = normalizeListHtml(paragraph.innerHTML);
            list.appendChild(item);
        });

        return list;
    }

    function isCompactLine(text) {
        return /^([0-9]+[\.、]|[①-⑳⒈-⒛])/.test(text) || text.length <= 40 || /[；。]$/.test(text) && text.length <= 48;
    }

    function normalizeListHtml(html) {
        return html
            .replace(/^([0-9]+[\.、]|[①-⑳⒈-⒛])\s*/, '')
            .replace(/；\s*$/, '');
    }

    function inferSectionTone(title) {
        if (/优势|特长|领导能力/.test(title)) {
            return 'strength';
        }

        if (/劣势|弱点|盲点/.test(title)) {
            return 'warning';
        }

        if (/职业|领域|岗位|工作/.test(title)) {
            return 'career';
        }

        if (/爱情|婚姻|家庭|生活|择偶|精神伴侣/.test(title)) {
            return 'relationship';
        }

        if (/发展建议|问题解决|功能|处事|看法|人格定位|价值观/.test(title)) {
            return 'insight';
        }

        return 'overview';
    }

    function padNumber(number) {
        return number < 10 ? '0' + number : String(number);
    }

    function createElement(tagName, className, textContent) {
        var element = document.createElement(tagName);

        if (className) {
            element.className = className;
        }

        if (typeof textContent === 'string') {
            element.textContent = textContent;
        }

        return element;
    }

    function normalizeText(text) {
        return String(text || '').replace(/\s+/g, ' ').trim();
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
