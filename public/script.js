// 稍后我们会替换为真实的后端API调用
async function loadMessages() {
    const container = document.getElementById('messagesList');
    // 临时模拟数据
    container.innerHTML = `
        <div class="message-item">
            <div class="message-name">系统消息</div>
            <div class="message-text">数据库连接后，这里会显示真实留言。</div>
            <div class="message-time">现在</div>
        </div>
    `;
}

document.getElementById('submitBtn')?.addEventListener('click', () => {
    alert('后端尚未连接，请继续教程添加数据库功能');
});

loadMessages();