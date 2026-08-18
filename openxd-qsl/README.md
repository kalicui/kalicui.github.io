# Open QSL & Logbook

纯前端的电子 QSL 卡与通联日志页面。首次使用时直接填写“我的呼号”和“我的 QTH”，资料会保存在该浏览器中，并自动用于 QSL 卡、下载文件名和页面抬头。生成 QSL 时会下载 PNG；不会上传任何通联数据。

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库，例如 `bi3tnq-qsl`。
2. 把本目录中的 `index.html`、`style.css`、`app.js` 推送到仓库默认分支。
3. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch**，分支选 `main`，目录选 `/(root)`，保存。
4. 等待部署完成后，通过 `https://你的GitHub用户名.github.io/bi3tnq-qsl/` 访问。

如果仓库名正好是 `你的GitHub用户名.github.io`，访问地址就是 `https://你的GitHub用户名.github.io/`。
