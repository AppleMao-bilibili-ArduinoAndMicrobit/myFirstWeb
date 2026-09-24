const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 托管静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 首页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 简单的 API 示例
app.get('/api/hello', (req, res) => {
  res.json({ message: '欢迎来到我的第一个 Web 项目！', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
});
