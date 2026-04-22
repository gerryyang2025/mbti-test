# 贡献指南

感谢为本项目做出改进。

## 开始之前

- 优先提交聚焦、单一目的的改动，避免把无关修改混在同一个提交或 PR 中。
- 涉及题库、人格内容、来源说明时，请同步检查 `README.md` 与 `data/questions-source.md` 是否需要更新。
- 涉及页面视觉变更时，建议在 PR 描述中附上截图或简短说明。

## 本地预览

本项目为纯静态站点，可直接使用本地静态服务器预览：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000/
```

## 提交前建议检查

- 首页、测试页、人格列表页、人格详情页能正常打开
- `static/js/` 中的脚本没有语法错误
- `data/` 中的 JSON 文件可以正常解析
- 新增文案没有使用本地绝对路径

可参考以下命令：

```bash
find static/js -name '*.js' -print0 | xargs -0 -n1 node --check
```

```bash
find data -name '*.json' -print0 | while IFS= read -r -d '' file; do
  node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$file"
done
```

## Pull Request 建议

- 标题清楚说明改动目的
- 描述中说明修改内容、影响范围与验证方式
- 如果改动影响 UI，请附截图
- 如果改动影响文档或数据结构，请在 PR 中明确说明

