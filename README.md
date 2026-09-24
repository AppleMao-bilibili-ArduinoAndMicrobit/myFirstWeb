# myFirstWeb - 我的第一个 Web 项目

一个基于 Node.js + Express 的待办清单（Todo List）Web 应用。

## 功能特性

- 添加、完成、删除待办事项
- 按状态过滤（全部 / 进行中 / 已完成）
- 一键清除所有已完成任务
- 数据自动保存到浏览器本地存储（localStorage）
- 响应式设计，支持手机和电脑访问
- 现代化渐变 UI 界面

## 技术栈

- **后端**: Node.js + Express
- **前端**: 原生 HTML / CSS / JavaScript
- **数据存储**: 浏览器 localStorage

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
```

### 3. 访问应用

打开浏览器访问: http://localhost:3000

## 项目结构

```
myFirstWeb/
├── server.js          # Express 服务端入口
├── package.json       # 项目配置
├── public/
│   ├── index.html     # 页面结构
│   ├── style.css      # 样式文件
│   └── script.js      # 交互逻辑
└── .gitignore
```

## API 接口

- `GET /` - 返回首页
- `GET /api/hello` - 示例 API，返回欢迎信息

## 许可证

MIT
