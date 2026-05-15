# 随手弹钢琴 微信小程序

零基础也能弹钢琴的小程序，左手和弦右手旋律。

## 功能特性

- 🎹 **真实钢琴键盘** - Canvas 绘制 C3-F4 音域，触控交互
- 📝 **贴谱就弹** - 粘贴简谱数字，自动转C调白键版
- 🎵 **跟走模式** - 零压力教学，按对自动推进
- 🎶 **伴音系统** - 自动和弦伴奏、旋律导引音
- 📖 **内置曲库** - 5首公共版权曲目（小星星、欢乐颂等）
- 🏆 **计分系统** - 正确+100，错误-10，连击加分
- 📊 **成绩页面** - 分数、最高连击、正确率

## 项目结构

```
piano-miniapp/
├── app.js / app.json / app.wxss    # 小程序入口
├── project.config.json              # 项目配置
├── utils/
│   ├── audio-synth.js               # 音频合成（Web Audio API）
│   └── music-engine.js              # 乐谱改造引擎
├── data/
│   └── songs.js                     # 内置曲目数据
├── components/
│   └── piano-keyboard/              # 钢琴键盘组件
├── pages/
│   ├── index/                       # 首页
│   ├── play/                        # 弹奏页（横屏）
│   ├── preview/                     # 预览页（横屏）
│   ├── import/                      # 贴谱导入页
│   └── profile/                     # 我的页面
```

## 开发工具

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开工具，选择「导入项目」
3. 选择本目录 `piano-miniapp/`
4. 填写 AppID（测试可用「测试号」）
5. 点击「确定」开始开发

## 技术要点

- **音频**：Web Audio API 振荡器合成（首期），三角波模拟钢琴音色
- **键盘**：Canvas 2D 绘制，支持多点触控
- **横屏**：弹奏页/预览页使用 `pageOrientation: "landscape"`
- **乐谱引擎**：简谱解析 → 转调 → 白键约束 → 和弦映射 → JSON输出

## 开发计划

- [x] Phase 1: 项目初始化
- [x] Phase 2: 音频合成模块
- [x] Phase 3: 乐谱改造引擎
- [x] Phase 4: 内置曲目数据
- [x] Phase 5: 钢琴键盘组件
- [x] Phase 6: 首页
- [x] Phase 7: 弹奏页（核心功能）
- [x] Phase 8: 预览页
- [x] Phase 9: 导入页
- [x] Phase 10: 我的页面

## 待完善功能（二期）

- [ ] 瀑布流挑战模式
- [ ] 会员体系
- [ ] 钢琴采样文件替换
- [ ] 广告接入
- [ ] 实物推荐带货
- [ ] 曲谱包购买
