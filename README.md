# MBTI 职业性格测试

一个面向中文场景的静态 MBTI 测试网站，包含首页、93 题测试页、十六型人格列表页和人格详情页。项目采用纯前端实现，适合学习静态站点开发、人格类型内容组织，以及基于问卷结果的页面展示。

## 项目简介

本项目提供一套可直接运行的 MBTI 测试体验：

- 93 道自评题目，按单题逐步作答
- 根据四个维度计算 16 型人格结果
- 提供十六型人格总览页与单独详情页
- 支持本地直接预览，也支持部署到任意静态文件服务器

本项目可作为轻量的性格测试演示站、课程作业、静态前端练习项目，或继续扩展的人格内容站点基础版本使用。

## 什么是 MBTI

MBTI 是 Myers-Briggs Type Indicator 的缩写，常译作“迈尔斯-布里格斯类型指标”。它最早由 Katharine Cook Briggs 和 Isabel Briggs Myers 在 Carl Jung 类型理论的启发下发展而来，本质上是一种自我报告式问卷工具，用来描述个体在信息获取、判断决策与生活方式上的偏好倾向。相关背景可参考 [Wikipedia: Myers-Briggs Type Indicator](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator) 和 [The Myers-Briggs Company: MBTI Facts](https://www.themyersbriggs.com/en-us/support/mbti-facts)。

MBTI 通常把人格偏好分为四组二分维度：

- `E / I`：外向（Extraversion）与内向（Introversion）
- `S / N`：感觉（Sensing）与直觉（Intuition）
- `T / F`：思考（Thinking）与情感（Feeling）
- `J / P`：判断（Judging）与知觉（Perceiving）

四组偏好组合后，会得到一个四字母类型，例如 `INTJ`、`ENFP`、`ESFJ`。因此，MBTI 总共对应 16 种人格类型。

## 如何理解 MBTI 结果

在阅读测试结果时，比较稳妥的理解方式是把它看成“偏好描述”，而不是“能力证明”或“结论标签”：

- 它更接近日常情境中的偏好倾向，而不是智力、价值观、职业能力或心理健康诊断
- 类型之间没有高低优劣之分，不同类型只是偏好的组织方式不同
- 结果会受到答题状态、语言理解、生活阶段与自我认知程度的影响
- 同一个人不同时间测得的结果，可能出现接近类型之间的摇摆

同时也需要注意，MBTI 虽然流行度很高，但其科学效度与信度长期存在争议。更适合把它用作自我观察、交流讨论或内容组织工具，而不适合当作临床诊断、招聘筛选或高风险决策依据。关于历史沿革、常见争议和官方使用边界，可参考 [Wikipedia](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)、[MBTI Facts](https://www.themyersbriggs.com/en-us/support/mbti-facts) 和 [MBTI Manual Supplements](https://www.themyersbriggs.com/en-US/Support/MBTI-manual-supplements)。

## 本项目的测试说明

本仓库中的实现属于“问卷打分型 MBTI 测试”，而不是基于聊天记录、社交媒体文本或行为日志的自动推断模型。

测试时建议遵循以下原则：

- 按照长期、稳定、自然的倾向作答，而不是按照“理想中的自己”作答
- 尽量独立完成，不要边测边查答案或迎合某种想得到的类型
- 如果两个选项都像自己，优先选择更常见、更稳定的那一个
- 结果更适合用来辅助自我反思，而不是定义全部人格特征

本项目当前测试流程为：

1. 从题库读取 93 道题目。
2. 将每一道选择映射到 MBTI 四个维度中的某一侧。
3. 根据四组维度的累积结果生成四字母人格类型。
4. 跳转到对应的人格详情页展示简介、特点与延伸说明。

## 93 题题库来源说明

当前仓库使用的 93 题题库并非项目原创。从题目数量、题型结构和公开流传中文问卷比对来看，这套题目与 [问卷网公开页面《MBTI职业性格测试（93题版）》](https://www.wenjuan.com/s/ZjqEbu/) 的中文题面高度相关，同时在题目数量上与 [The Myers-Briggs Company Pty Ltd 当前提供的 MBTI Form M 简体中文自评材料](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1) 中所示的 `93 items` 结构一致。

目前可确认的信息包括：

- [The Myers-Briggs Company Pty Ltd 当前产品页](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1) 说明，`MBTI® Self-Scorable assessment` 包含 `93 items`
- 本仓库的 `questions.json` 也是 `93` 道二选一题
- [问卷网公开页面《MBTI职业性格测试（93题版）》](https://www.wenjuan.com/s/ZjqEbu/) 展示了一套 93 题中文问卷，其中大量题面与当前仓库一致或仅存在顺序、选项方向、计分方式上的差异
- 该问卷页面采用的是“为 A/B 两项分配分数，总和为 5”的作答形式，而本仓库实现采用的是“单题二选一”形式
- 中文修订研究文献中可检索到 [《心理类型量表(MBTI)的修订初步》](https://med.wanfangdata.com.cn/Paper/Detail?dbid=WF_QK&id=PeriodicalPaper_yyxlx200102006)、[《MBTI—G人格类型量表中文版的修订》](https://dianda.cqvip.com/Qikan/Article/Detail?from=Qikan_Article_Detail&id=12324423) 等资料，以及 [MBTI Facts](https://www.themyersbriggs.com/en-us/support/mbti-facts) 中关于 `Form M` 的时间线说明

因此，较稳妥的来源表述应为：

> 本项目题库在结构上参考 MBTI Form M 的 93 题体系，在中文题面上主要参考问卷网公开页《MBTI职业性格测试（93题版）》及同类流传版本，并转换为仓库当前使用的二选一计分形式。当前仓库未持有可核验的官方授权中文原题本。

更详细的来源分析见：

- [`data/questions-source.md`](data/questions-source.md)

## 与 Kaggle MBTI 数据集的关系

[Kaggle 数据集 `(MBTI) Myers-Briggs Personality Type Dataset`](https://www.kaggle.com/datasets/datasnaek/mbti-type) 更偏向“文本研究”场景。根据数据集页面描述，它包含 8600 多条样本，每条样本由两部分组成：

- 一个用户的四字母 MBTI 类型
- 该用户最近 50 条帖子内容的拼接文本

这类数据通常更适合做：

- NLP 文本分类
- 基于语言风格的 MBTI 预测实验
- 线上行为与人格标签关系的探索

本项目**没有直接使用**该 Kaggle 数据集做结果计算；当前实现仍然是基于问卷答案的前端评分逻辑。也就是说，本仓库回答的是“用户在题目里如何选择”，而不是“系统如何从一段文本中推测类型”。

## 功能特性

- 纯静态页面实现，部署简单
- 题目、人格摘要、人格详情均拆分为静态数据文件
- 支持十六型人格总览与单类型详情阅读
- 当前版本对本地预览环境做了数据回退处理，便于直接打开 HTML 调试
- 已补齐 GitHub Pages 发布工作流、`.nojekyll` 与 `404.html`

## 运行方式

本项目可通过两种方式运行：

- 直接打开 `index.html` 进行本地预览
- 使用任意静态服务器运行，例如：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```

## GitHub Pages 部署

当前仓库已经补齐适合 GitHub Pages 的基础发布文件与工作流：

- `.github/workflows/pages.yml`：使用 GitHub Actions 自动发布静态站点
- `.nojekyll`：关闭 Jekyll 处理，避免未来出现以下划线开头目录时被忽略
- `404.html`：为 GitHub Pages 提供自定义 404 页面和返回入口

部署步骤如下：

1. 将仓库推送到 GitHub。
2. 打开仓库的 `Settings -> Pages`。
3. 在 `Build and deployment` 中选择 `GitHub Actions`。
4. 保持默认分支为 `main` 或 `master`，后续推送会自动触发发布。
5. 等待 `Deploy GitHub Pages` 工作流执行完成后访问站点。

如果采用项目页部署，访问地址通常为：

```text
https://<GitHub 用户名>.github.io/<仓库名>/
```

当前页面资源与数据文件均使用相对路径引用，因此既支持根域名部署，也支持 GitHub Pages 的项目子路径部署。

如果后续需要绑定自定义域名，建议按 GitHub Pages 的当前官方方式配置：

1. 在仓库的 `Settings -> Pages -> Custom domain` 中填写目标域名。
2. 在域名服务商处配置 DNS 记录：
   - 如果使用子域名，例如 `www.example.com`，通常配置 `CNAME` 指向 `<GitHub 用户名>.github.io`
   - 如果使用根域名，例如 `example.com`，通常配置 `A`、`ALIAS` 或 `ANAME` 记录
3. 等待 GitHub 完成域名校验与 HTTPS 证书签发。

当前仓库使用的是自定义 GitHub Actions 发布流程，因此 `CNAME` 文件不是必需项。只有在未来改为“从分支直接发布 GitHub Pages”时，才需要在仓库根目录维护 `CNAME` 文件。

## 项目结构

- `index.html`：首页入口
- `404.html`：GitHub Pages 自定义 404 页面
- `mbti-test.html`：答题页
- `personality-types.html`：人格列表页
- `personality-detail.html`：人格详情页
- `.nojekyll`：GitHub Pages 禁用 Jekyll 的标记文件
- `.github/workflows/pages.yml`：GitHub Pages 自动发布工作流
- `data/questions.json`：题库
- `data/questions.js`：题库的本地预览回退文件
- `data/personality-summaries.json`：人格列表摘要数据
- `data/personality-summaries.js`：人格摘要的本地预览回退文件
- `data/personalities/`：单个人格详情数据与回退文件
- `static/js/common/`：评分逻辑、导航逻辑、数据加载逻辑
- `static/js/pages/`：页面级脚本
- `static/css/`：页面样式
- `static/img/`：图片资源

## 适用边界与免责声明

- 本项目仅供交流学习与前端演示使用
- 测试结果仅供参考，不构成专业心理评估意见
- 不建议将结果用于医疗、诊断、招聘、录用或其他高风险决策

## 参考资料

- [Wikipedia: Myers-Briggs Type Indicator](https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator)
- [Kaggle: (MBTI) Myers-Briggs Personality Type Dataset](https://www.kaggle.com/datasets/datasnaek/mbti-type)
- [问卷网：MBTI职业性格测试（93题版）](https://www.wenjuan.com/s/ZjqEbu/)
- [The Myers-Briggs Company: MBTI Facts](https://www.themyersbriggs.com/en-us/support/mbti-facts)
- [GitHub Docs: About custom domains and GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [GitHub Docs: Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

