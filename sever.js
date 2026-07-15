const express = require('express');
const app = express();
const port = 3000;

// 让 public 文件夹里的所有文件可以被浏览器访问
app.use(express.static('public'));

// 启动服务器
app.listen(port, () => {
  console.log(`服务器已启动，请访问 http://localhost:${port}`);
});