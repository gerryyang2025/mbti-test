# 93 题题库来源分析

## 结论

当前仓库中的 `questions.json` 属于一套**广泛流传的中文 MBTI 93 题版本**。从题目数量、题型结构和公开问卷页面比对来看，它与 [问卷网公开页《MBTI职业性格测试（93题版）》](https://www.wenjuan.com/s/ZjqEbu/) 高度相关；同时从题目总数和问卷结构看，它也**高度疑似基于 [MBTI Form M（93-item）体系](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1) 衍生或加工整理而来**。不过，当前仓库所使用的中文题面**暂未核实到明确、可验证的官方授权首发来源**。

因此，更稳妥的标注方式应为：

> 本题库在结构上参考 [MBTI Form M 的 93 题体系](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1)，在中文题面上主要参考 [问卷网公开页《MBTI职业性格测试（93题版）》](https://www.wenjuan.com/s/ZjqEbu/) 及同类流传版本；当前仓库实现已将其整理为二选一计分形式。当前中文题面可能属于改写或加工版本，非经核验的官方授权原文。

## 判断依据

### 1. 题目数量与官方 MBTI Form M 一致

[The Myers-Briggs Company Pty Ltd 当前产品页面](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1) 说明，`MBTI® Self-Scorable assessment` 包含 `93 items`。此外，[MBTI Facts 时间线](https://www.themyersbriggs.com/en-us/support/mbti-facts) 提到 `1998` 年发布 `Form M`。这与本仓库 `questions.json` 中的题目总数一致。

### 2. 题目结构符合 MBTI 强制二选一问卷形式

本仓库题库为 93 道二选一题，覆盖四个维度：

- `E / I`
- `S / N`
- `T / F`
- `J / P`

这与公开介绍中的 MBTI Form M 结构相符。

### 3. 当前中文题面与公开流传版本高度一致

题库中的题目，例如：

- `当你要外出一整天，你会`
- `假如你是一名老师，你会选教`
- `在下列每一对词语中，哪一个词语更合你心意？`

与 [问卷网公开页《MBTI职业性格测试（93题版）》](https://www.wenjuan.com/s/ZjqEbu/) 以及网上长期流传的中文文档 [《MBTI职业性格测试题》93题标准版本](https://max.book118.com/html/2018/0516/166707949.shtm) 的题面表述高度一致。

### 4. 问卷网页面可作为当前中文题面的直接参考链接

[问卷网公开页](https://www.wenjuan.com/s/ZjqEbu/) 展示了完整的 93 题中文版本，例如：

- `当你要外出一整天，你会`
- `大多数人会说你是一个`
- `假如你是一位老师，你会选择`

这些题面与当前仓库题库中的大量条目直接对应。需要注意的是：

- 问卷页面采用的是 `A/B 两项分配分数，总和为 5` 的作答方式
- 当前仓库实现采用的是 `A/B 二选一` 的作答方式

因此，更合适的描述不是“仓库直接复制了问卷网计分规则”，而是“当前题面参考了该中文问卷版本，并转换成仓库内部使用的二选一映射结构”。

### 5. 公开流传版本自述“在 M 版基础上加工形成”

公开流传文档 [《MBTI职业性格测试题》93题目标准版本](https://max.book118.com/html/2018/0516/166707949.shtm) 中明确写到：

- 此测验在 `MBTI 最新权威版 M 版本的基础上加工形成`
- 中国心理学工作者曾对 `G 版本` 做过中文翻译和修订，对应可检索资料如 [《心理类型量表(MBTI)的修订初步》](https://med.wanfangdata.com.cn/Paper/Detail?dbid=WF_QK&id=PeriodicalPaper_yyxlx200102006) 和 [《MBTI—G人格类型量表中文版的修订》](https://dianda.cqvip.com/Qikan/Article/Detail?from=Qikan_Article_Detail&id=12324423)
- `1998 年后` 又修订出版了 `M 版本`

这进一步说明当前常见中文 93 题版本更像是**基于 M 版加工形成的职业测评流传稿**，而不是仓库作者自行原创。

## 当前仓库建议写法

建议在 README 或项目说明中使用以下表述：

> 本项目使用的 93 题题库，与公开流传的中文《MBTI职业性格测试题》版本高度一致；从题目数量和结构看，题库应源自 MBTI Form M（93-item）体系，并经过中文整理或加工。当前仓库未持有可核验的官方授权原始中文题本，因此题面来源按“基于 MBTI Form M 的中文流传整理版”标注更为稳妥。

如果需要体现更直接的网页参考，也可写为：

> 本项目使用的 93 题题库，在中文题面上主要参考问卷网公开页《MBTI职业性格测试（93题版）》；从题目数量和结构看，其背后题库体系与 MBTI Form M（93-item）高度相关。仓库当前实现对题面做了结构整理，并采用二选一计分方式呈现。

## 参考线索

- [The Myers-Briggs Company Pty Ltd: `MBTI Form M Self-Scorable Assessment & Introduction to Myers-Briggs Type (7th Ed.) - Simplified Chinese`](https://ap.themyersbriggs.com/Translations-16/MBTI-Form-M-Self-Scorable-Assessment--Introduction-to-Myers-Briggs-Type-7th-Ed-Simplified-ChineseR--1-204?Product=204&Type=1)
- [The Myers-Briggs Company: `MBTI Facts` 时间线说明](https://www.themyersbriggs.com/en-us/support/mbti-facts)
- [问卷网公开页：`MBTI职业性格测试（93题版）`](https://www.wenjuan.com/s/ZjqEbu/)
- 万方 / 维普可检索到的中文修订研究：
  - [《心理类型量表(MBTI)的修订初步》](https://med.wanfangdata.com.cn/Paper/Detail?dbid=WF_QK&id=PeriodicalPaper_yyxlx200102006)
  - [《MBTI—G人格类型量表中文版的修订》](https://dianda.cqvip.com/Qikan/Article/Detail?from=Qikan_Article_Detail&id=12324423)
- 公开流传文档：
  - [《MBTI职业性格测试题》93题目标准版本](https://max.book118.com/html/2018/0516/166707949.shtm)

## 备注

由于 MBTI 题库本身涉及商业测评工具和可能的版权、商标使用边界，若后续用于公开发布、商业部署或规模化传播，建议进一步核验：

- 中文题面的授权状态
- 与官方 MBTI® 题本的关系
- 是否需要替换为自编题库或明确可再分发版本
