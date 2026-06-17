# 迅达 OpenXD 聚合购物 H5 平台 - 需求拆解文档

## 产品概述

- **产品类型**: 移动端聚合购物平台（H5）
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 追求性价比、习惯多平台比价的移动端购物用户
- **核心价值**: 一站式聚合拼多多、淘宝、抖音、京东四大平台商品，支持分类筛选、价格排序和关键词搜索，提供完整的购物车体验
- **界面语言**: zh-CN
- **主题偏好**: user_specified（深邃墨色 #1a1a1a 主色调，雅致藏青 #2c3e50 辅助色，高级质感暗色主题）
- **导航模式**: 无导航（单页应用，所有功能在同一页面内完成）

---

## 页面结构总览

> **说明**：单页应用，所有功能模块集成在同一页面内

**页面文件**: `HomePage.tsx`

| 区域 | 说明 |
|-----|------|
| 品牌标识区 | 迅达 OpenXD Logo + 品牌标语 |
| 搜索栏 | 关键词实时搜索输入框 |
| 平台筛选栏 | 4 大平台 Tab 切换（全部/拼多多/淘宝/抖音/京东） |
| 分类筛选栏 | 7 大分类横向滚动标签（精选/服饰/数码/食品/家居/美妆/母婴） |
| 排序控制栏 | 排序方式切换（默认/价格升序/价格降序） |
| 商品列表区 | 商品卡片网格布局，展示商品图片、名称、平台标签、价格、加入购物车按钮 |
| 购物车角标 | 固定在页面右下角的购物车图标 + 数量角标 |
| 购物车抽屉 | 从底部滑出的购物车面板，展示已添加商品、数量调整、总价计算 |
| 商品详情弹窗 | 点击商品卡片弹出的详情模态框，展示完整商品信息 |

---

## 页面布局建议

- **布局模式**: 上下分区（单栏滚动）—— 移动端 H5 优先，所有筛选/排序控件在顶部，商品列表在下方，购物车为底部抽屉
- **视觉重心**: 商品列表 —— 核心浏览和操作区域，卡片式布局突出商品图片和价格
- **结果承载区**: 商品卡片网格（2 列布局）；初始态为 12 件商品全部展示（默认精选分类 + 默认排序）；搜索无结果时展示空状态提示

---

## 数据来源声明

| 数据/操作 | 来源类型 | 实现要求 | mock 兜底 |
|---|---|---|---|
| 12 件商品数据 | demo-mock | `src/data/products.ts` 定义 12 件商品数组，覆盖 4 平台 × 7 分类，每件商品含 id/name/platform/category/price/image/description 字段 | ✅ 本身就是 mock |
| 购物车数据 | local-persist | localStorage key=`__global_openxd_cart`，存储 `ICartItem[]`，页面初始化时读取 | 初始空数组 `[]` |

---

## 功能列表

- **区域: 品牌标识区**
  - **页面目标**: 建立品牌认知
  - **功能点**:
    - 展示品牌 Logo 和名称"迅达 OpenXD"
    - 展示品牌标语（如"聚合好物，一站比价"）

- **区域: 搜索栏**
  - **页面目标**: 支持用户通过关键词快速查找商品
  - **功能点**:
    - 实时搜索：输入关键词后即时过滤商品列表（匹配商品名称）
    - 搜索框带清除按钮，点击清空关键词并恢复完整列表
    - 搜索无结果时展示空状态提示

- **区域: 平台筛选栏**
  - **页面目标**: 按电商平台筛选商品
  - **功能点**:
    - 5 个 Tab：全部 / 拼多多 / 淘宝 / 抖音 / 京东
    - 点击 Tab 切换平台筛选，与当前分类筛选和排序叠加生效
    - 当前选中 Tab 高亮显示

- **区域: 分类筛选栏**
  - **页面目标**: 按商品分类筛选
  - **功能点**:
    - 7 个分类标签横向滚动：精选 / 服饰 / 数码 / 食品 / 家居 / 美妆 / 母婴
    - 点击标签切换分类筛选，与当前平台筛选和排序叠加生效
    - 默认选中"精选"
    - 当前选中标签高亮显示

- **区域: 排序控制栏**
  - **页面目标**: 按价格排序商品列表
  - **功能点**:
    - 3 种排序方式切换：默认（原始顺序）/ 价格升序 / 价格降序
    - 排序与当前筛选条件叠加生效
    - 显示当前排序状态

- **区域: 商品列表区**
  - **页面目标**: 展示商品信息，支持加入购物车和查看详情
  - **功能点**:
    - 2 列网格布局展示商品卡片
    - 每张卡片展示：商品图片（占位图）、商品名称、平台标签（彩色 Badge）、价格（¥ 格式）
    - 每张卡片底部有"加入购物车"按钮
    - 点击商品卡片弹出详情弹窗
    - 筛选/搜索/排序后列表实时更新
    - 列表为空时展示空状态

- **区域: 购物车角标**
  - **页面目标**: 快速查看购物车状态
  - **功能点**:
    - 固定在页面右下角的悬浮购物车图标
    - 角标数字显示购物车商品总数量
    - 点击角标打开购物车抽屉
    - 添加商品时角标数字动画更新

- **区域: 购物车抽屉**
  - **页面目标**: 管理已添加的商品
  - **功能点**:
    - 从底部滑出的抽屉面板
    - 展示已添加商品列表：商品名称、单价、数量调整器（+/-按钮）、小计金额、删除按钮
    - 底部固定栏显示总价
    - 支持数量调整（最少 1 件，减到 0 时移除商品）
    - 支持删除单个商品
    - 购物车为空时展示空状态
    - 关闭抽屉时数据自动持久化到 localStorage

- **区域: 商品详情弹窗**
  - **页面目标**: 展示商品完整信息
  - **功能点**:
    - 模态弹窗展示商品大图（占位图）、名称、平台、分类、价格、详细描述
    - 底部"加入购物车"按钮
    - 点击遮罩层或关闭按钮关闭弹窗

---

## 数据共享配置

| 存储键名 | 数据说明 | 使用页面 |
|---------|---------|---------|
| `__global_openxd_cart` | 购物车商品列表，类型为 `ICartItem[]` | 商品列表区、购物车抽屉、购物车角标 |

```ts
interface ICartItem {
  /** 商品 ID */
  productId: string;
  /** 商品名称 */
  name: string;
  /** 商品单价 */
  price: number;
  /** 所属平台 */
  platform: string;
  /** 购买数量 */
  quantity: number;
  /** 商品图片（占位图 URL） */
  image: string;
}

interface IProduct {
  /** 商品唯一 ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 所属平台：pinduoduo | taobao | douyin | jd */
  platform: 'pinduoduo' | 'taobao' | 'douyin' | 'jd';
  /** 商品分类：featured | clothing | digital | food | home | beauty | baby */
  category: 'featured' | 'clothing' | 'digital' | 'food' | 'home' | 'beauty' | 'baby';
  /** 商品价格（元） */
  price: number;
  /** 商品图片（占位图 URL） */
  image: string;
  /** 商品描述 */
  description: string;
}

-------

<scene_type>prototype-app</scene_type>

# UI 设计指南

## 1. 设计推导依据

- **参考意图**: Free Direction —— 用户提供明确色彩锚点与质感方向，无成品参考图，按产品语义自主建立视觉系统
- **核心情绪 / 应用类型**: 聚合购物 H5 平台，需要在多平台商品浏览中建立"迅达 OpenXD"的品牌信任感与高级零售体验
- **独特记忆点**: 墨色基底上的藏青冷调商品卡片，hover 时卡片微升并浮现暖色价格标签，形成"暗夜橱窗"般的浏览质感

## 2. Art Direction

- **方向名**: 暗夜橱窗
- **Design Style**: Minimal Dark + Editorial 排版 —— 深色背景承载商品展示，克制留白与精致分割线营造高端零售空间感，避免电商常见的促销喧闹
- **DNA 参数**: 圆角 subtle（3px 统一）/ 阴影 subtle（极淡浮层）/ 间距 spacious（舒适留白）/ 字体方向 无衬线清晰阅读 / 装饰手法 细腻分割线与 hover 微动效
- **应用类型**: Tool —— 移动端优先的商品浏览与购物车工具，卡片网格布局

## 3. Color System

**色彩关系**: 深邃墨色基底 + 雅致藏青卡片承载面 + 暖白文字系统 + 琥珀色价格锚点
**配色设计理由**: 墨色背景建立高端零售氛围，藏青卡片形成层次而不跳脱；暖白文字保证长时间浏览舒适度；琥珀色 primary 仅用于价格、CTA 和购物车角标，形成明确的行动引导
**主色推导**: 用户指定 #1a1a1a 墨色与 #2c3e50 藏青，primary 选择暖琥珀色作为价格与行动色，在冷调基底上形成温暖聚焦点，符合购物场景的转化引导
**使用比例**: 60% 墨色基底与藏青卡片 / 30% 暖白文字与浅灰辅助 / 10% 琥珀 primary

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|---|---|---|---|---|
| bg | `--background` | `bg-background` | hsl(0 0% 10%) | 深邃墨色页面基底 |
| card | `--card` | `bg-card` | hsl(210 29% 24%) | 雅致藏青商品卡片、弹层 |
| text | `--foreground` | `text-foreground` | hsl(40 20% 94%) | 暖白标题与正文 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | hsl(210 10% 60%) | 平台标签、分类、辅助信息 |
| primary | `--primary` | `bg-primary` / `text-primary` | hsl(35 85% 55%) | 价格、CTA 按钮、购物车角标 |
| primaryForeground | `--primary-foreground` | `text-primary-foreground` | hsl(0 0% 10%) | primary 上的深色文字 |
| accent | `--accent` | `bg-accent` | hsl(210 20% 18%) | hover/focus 浅底、选中态 |
| accentForeground | `--accent-foreground` | `text-accent-foreground` | hsl(40 20% 94%) | accent 上的文字 |
| border | `--border` | `border-border` | hsl(210 10% 30%) | 卡片边界、分割线、输入框 |

**语义色提示**: 
- 成功（加入购物车反馈）：bg `hsl(150 40% 20%)` / border `hsl(150 40% 35%)` / text `hsl(150 50% 70%)`，低饱和绿与墨色基底融合
- 警告（库存紧张）：bg `hsl(35 50% 18%)` / border `hsl(35 60% 40%)` / text `hsl(35 70% 65%)`，暖调与 primary 同色系
- 错误（操作失败）：bg `hsl(0 30% 18%)` / border `hsl(0 40% 35%)` / text `hsl(0 50% 65%)`，低饱和红不刺眼
- 所有语义色饱和度控制在 30-50%，与 primary 的 85% 饱和度形成层级，不抢夺主行动色注意力

## 4. 字体与节奏

- **font-display**: Noto Sans SC —— 中文商品标题清晰可读，几何感与藏青卡片匹配
- **font-body**: Inter —— 价格数字、平台标签、购物车数量等西文与数字部分
- **字号**: H1 text-2xl（品牌标识）；H2 text-lg（分类标题）；body text-sm ~ text-base（商品名）；price text-xl font-bold（价格锚点）
- **圆角**: subtle（3px 统一）—— 用户指定，保持精致而不软萌，匹配高端零售气质

## 5. 全局布局契约

- **Reference Layout Use**: 按需求结构推导 —— 顶部品牌栏 + 搜索 + 平台/分类筛选栏 + 排序 + 商品网格 + 底部购物车浮层
- **Page / Section Order**: 品牌标识 → 搜索栏 → 平台切换（4 标签）→ 分类筛选（7 标签）→ 排序切换 → 商品网格（2 列）→ 购物车浮层角标
- **Standard Content Zone**: `max-w-lg mx-auto` —— 移动端优先，单列最大宽度适配手机屏幕，商品网格 2 列
- **Shell / Frame Alignment**: 独立滚动 —— 顶部筛选区固定，商品列表独立滚动，购物车底部浮层固定
- **Padding & Rhythm**: `px-4 py-3` 全局内边距，卡片间距 `gap-3`，区块间距 `mb-4`
- **Full-bleed Zones**: 品牌栏背景与购物车浮层可全宽，内部内容仍受 `px-4` 约束
- **Local Narrowing**: 商品详情弹窗 `max-w-sm`，搜索输入框 `max-w-full`
- **Overflow Strategy**: 分类标签横向滚动 `overflow-x-auto`，商品网格正常换行
- **Flexibility Boundary**: 允许移动端调整卡片列数（2→1 极小屏）；全局 max-w-lg、3px 圆角、墨色基底、藏青卡片保持一致

## 6. 视觉与动效

- **装饰**: 细腻分割线 + 价格标签微光
- **阴影/边界**: 极淡阴影（`shadow-sm` 降低 opacity），卡片边界用 `border` 替代重阴影
- **动效**: 精致 —— hover 卡片 `scale(1.02)` + 价格色从藏青过渡到琥珀，150ms ease-out；购物车角标弹入 `scale(1.2)` → `scale(1)`；筛选标签切换 150ms 背景色过渡

## 7. 组件原则

- 按钮、筛选标签、商品卡片必须有 Default / Hover / Active / Focus / Disabled 状态
- Primary 仅用于价格显示、加入购物车按钮、购物车角标；平台/分类标签用 accent 承接选中态
- 商品卡片 Default 藏青底 + 暖白文字；Hover 微升 + 价格变琥珀；Active 按下微缩
- 购物车浮层：底部固定，角标数字用 primary 圆形底，空状态显示藏青虚线框
- 搜索框：藏青底 + 浅灰边框，focus 时边框过渡到 primary

## 8. Image Direction

- **Image Role**: 商品缩略图 —— 卡片内 1:1 方形商品图，作为每个商品卡片的视觉焦点
- **Image Art Direction**: 干净产品摄影风格，浅灰中性背景，单一商品居中，柔和顶光，无杂乱阴影，材质真实（织物纹理、包装光泽、屏幕反光），色彩准确不夸张
- **Image Prompt Keywords**: clean product photography, single item centered, soft top lighting, neutral light gray background, subtle shadow, e-commerce catalog style, accurate color, 1:1 square ratio
- **Image Avoidance**: 避免电商促销风格（爆炸贴纸、高饱和撞色背景、多商品拼贴）、避免过度修图塑料感、避免杂乱生活场景、避免文字水印覆盖

## 9. Anti-patterns

- **Split personality**: 商品详情弹窗突然变成白色背景或大圆角卡片；所有弹层、浮层统一藏青底 + 3px 圆角
- **Phantom tokens**: 编造不存在的 `--price-glow` 或 `--card-elevation` 变量；价格高亮用 primary，卡片层次用 border
- **Default SaaS drift**: 回到默认蓝按钮、白色卡片、通用灰背景；坚持墨色基底 + 藏青卡片 + 琥珀行动色
- **Invisible interaction**: 筛选标签只有颜色变化无 focus 环；所有可交互元素加 `focus-visible:ring-1 ring-primary/50`
- **Mono-hue tyranny**: 琥珀色同时用于价格、按钮、角标、标签选中、链接、图标；primary 仅用于价格与 CTA，标签选中用 accent，图标用 textMuted
- **Status color drift**: 成功绿过于鲜艳在深色背景上刺眼；语义色饱和度控制在 30-50%，与墨色基底融合而非跳出