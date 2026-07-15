document.getElementById('callCppBtn').addEventListener('click', function() {
    const input = document.getElementById('numInput').value;
    const resultSpan = document.getElementById('resultText');
    
    // 界面反馈：正在计算
    resultSpan.textContent = '⏳ 正在调用 C++ 计算...';
    
    // 发送请求给 Node.js 服务器
    fetch(`/run-cpp?num=${input}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 显示 C++ 返回的结果
                resultSpan.textContent = `${data.input} 的平方 = ${data.output}`;
            } else {
                resultSpan.textContent = `❌ 出错：${data.error}`;
            }
        })
        .catch(err => {
            resultSpan.textContent = `❌ 网络错误：${err.message}`;
        });
});