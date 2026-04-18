const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件：解析 JSON 请求体，提供静态文件服务
app.use(express.json());
app.use(express.static('public'));

// 初始化数据库
const db = new sqlite3.Database('./db.sqlite');
db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// API 路由：获取所有留言
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM messages ORDER BY timestamp DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API 路由：发布新留言
app.post('/api/messages', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        res.status(400).json({ error: '姓名和留言内容不能为空' });
        return;
    }
    const sql = 'INSERT INTO messages (name, message) VALUES (?, ?)';
    db.run(sql, [name, message], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, message });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});