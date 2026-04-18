// 加载留言列表
async function loadMessages() {
    const container = document.getElementById('messagesList');
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) throw new Error('加载失败');
        const messages = await response.json();
        
        if (messages.length === 0) {
            container.innerHTML = '<p>暂无留言，来发布第一条吧！</p>';
            return;
        }
        
        container.innerHTML = messages.map(msg => `
            <div class="message-item">
                <div class="message-name">${escapeHtml(msg.name)}</div>
                <div class="message-text">${escapeHtml(msg.message)}</div>
                <div class="message-time">${new Date(msg.timestamp).toLocaleString()}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('加载留言失败:', error);
        container.innerHTML = '<p>加载失败，请刷新页面重试</p>';
    }
}

// 发布新留言
async function postMessage(name, message) {
    const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '发布失败');
    }
    return await response.json();
}

// 简单防XSS攻击的转义函数
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// 处理表单提交
document.getElementById('submitBtn').addEventListener('click', async () => {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !message) {
        alert('请填写姓名和留言内容');
        return;
    }
    
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = '发布中...';
    
    try {
        await postMessage(name, message);
        nameInput.value = '';
        messageInput.value = '';
        await loadMessages(); // 重新加载列表
    } catch (error) {
        alert('发布失败: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = '发布留言';
    }
});

// 初始加载留言
loadMessages();