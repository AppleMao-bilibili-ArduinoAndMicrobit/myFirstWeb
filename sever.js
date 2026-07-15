const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// ========== 1. 先放 API 路由（优先级最高） ==========
app.get('/run-cpp', (req, res) => {
    const inputNum = parseInt(req.query.num) || 10;
    const exePath = path.join(__dirname, 'build', 'Debug', 'outDebug.exe');

    exec(`"${exePath}" ${inputNum}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error}`);
            return res.json({ 
                success: false, 
                error: stderr || error.message 
            });
        }
        const result = stdout.trim();
        console.log(`C++ 返回结果: ${result}`);
        res.json({ 
            success: true, 
            input: inputNum, 
            output: result 
        });
    });
});

// ========== 2. 后放静态文件托管（兜底） ==========
app.use(express.static('public'));

// ========== 3. 启动服务器 ==========
app.listen(port, () => {
    console.log(`🚀 服务器已启动: http://localhost:${port}`);
    console.log(`📌 C++ 程序路径: ${path.join(__dirname, 'build', 'Debug', 'outDebug.exe')}`);
});