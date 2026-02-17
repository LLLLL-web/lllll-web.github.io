// 新春祝福语模板库
const blessingTemplates = [
    // 传统经典祝福
    {
        id: 1,
        template: "{name}，新春快乐！愿您在新的一年里，身体健康，万事如意，阖家幸福！",
        category: "传统经典"
    },
    {
        id: 2,
        template: "恭祝{name}新春大吉！愿您财源广进，事业腾达，心想事成！",
        category: "财运事业"
    },
    {
        id: 3,
        template: "{name}，祝您新年快乐！愿您笑口常开，好运连连，幸福美满每一天！",
        category: "幸福快乐"
    },
    // 诗意祝福
    {
        id: 4,
        template: "金兔辞旧岁，祥龙迎新春。{name}，愿您在新的一年里，如龙腾飞，前程似锦！",
        category: "诗意祝福"
    },
    {
        id: 5,
        template: "春风送暖入屠苏，{name}迎春接福来。愿您新年新气象，好运常相伴！",
        category: "诗意祝福"
    },
    // 现代祝福
    {
        id: 6,
        template: "嗨，{name}！新年到，祝福到！愿您在新的一年里，所有的梦想都能实现，所有的希望都能如愿！",
        category: "现代祝福"
    },
    {
        id: 7,
        template: "{name}，新年快乐！愿您的生活像烟花一样绚烂，像灯笼一样红火，像饺子一样圆满！",
        category: "现代祝福"
    },
    // 事业学业祝福
    {
        id: 8,
        template: "祝{name}在新的一年里，事业蒸蒸日上，学业进步神速，步步高升！",
        category: "事业学业"
    },
    {
        id: 9,
        template: "{name}，愿您在新的一年里，工作顺利，学习进步，收获满满的成功和喜悦！",
        category: "事业学业"
    },
    // 健康平安祝福
    {
        id: 10,
        template: "新春佳节，{name}，愿您和您的家人身体健康，平安喜乐，岁岁安康！",
        category: "健康平安"
    }
];

// DOM元素引用
const nameInput = document.getElementById('name-input');
const generateBtn = document.getElementById('generate-btn');
const blessingContent = document.getElementById('blessing-content');
const copyBtn = document.getElementById('copy-btn');
const refreshBtn = document.getElementById('refresh-btn');
const templateCount = document.getElementById('template-count');
const templatesList = document.getElementById('templates-list');
const messageContainer = document.getElementById('message-container');

// 当前生成的祝福语
let currentBlessing = '';
let currentName = '';

// 初始化页面
function init() {
    // 显示模板数量
    templateCount.textContent = blessingTemplates.length;

    // 初始化模板预览
    initTemplatesPreview();

    // 绑定事件监听器
    bindEvents();

    // 设置输入框自动聚焦
    nameInput.focus();
}

// 初始化模板预览
function initTemplatesPreview() {
    templatesList.innerHTML = '';

    // 随机选择3个模板进行预览
    const previewTemplates = getRandomTemplates(3);

    previewTemplates.forEach(template => {
        const templateItem = document.createElement('div');
        templateItem.className = 'template-item';
        templateItem.innerHTML = `
            <div class="template-name">${template.category}</div>
            <div class="template-text">${template.template.replace('{name}', '您')}</div>
        `;

        // 点击模板可以快速生成祝福
        templateItem.addEventListener('click', () => {
            if (nameInput.value.trim()) {
                generateBlessing(template);
            } else {
                showMessage('请输入您的名字', 'warning');
                nameInput.focus();
            }
        });

        templatesList.appendChild(templateItem);
    });
}

// 获取随机模板
function getRandomTemplates(count) {
    const shuffled = [...blessingTemplates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 绑定事件监听器
function bindEvents() {
    // 生成按钮点击事件
    generateBtn.addEventListener('click', handleGenerateClick);

    // 输入框回车事件
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGenerateClick();
        }
    });

    // 复制按钮点击事件
    copyBtn.addEventListener('click', handleCopyClick);

    // 重新生成按钮点击事件
    refreshBtn.addEventListener('click', handleRefreshClick);

    // 输入框输入事件
    nameInput.addEventListener('input', () => {
        // 清除之前的祝福语
        if (nameInput.value.trim() === '') {
            resetBlessingDisplay();
        }
    });
}

// 处理生成按钮点击
function handleGenerateClick() {
    const name = nameInput.value.trim();

    if (!name) {
        showMessage('请输入您的名字', 'warning');
        nameInput.focus();
        return;
    }

    if (name.length > 20) {
        showMessage('名字长度不能超过20个字符', 'warning');
        return;
    }

    currentName = name;

    // 随机选择一个模板
    const randomTemplate = blessingTemplates[Math.floor(Math.random() * blessingTemplates.length)];

    // 生成祝福语
    generateBlessing(randomTemplate);

    // 添加按钮动画效果
    animateGenerateButton();
}

// 生成祝福语
function generateBlessing(template) {
    // 替换模板中的名字占位符
    currentBlessing = template.template.replace('{name}', `<span class="name-highlight">${currentName}</span>`);

    // 显示祝福语
    displayBlessing(currentBlessing, template.category);

    // 显示成功消息
    showMessage('祝福语生成成功！', 'success');
}

// 显示祝福语
function displayBlessing(blessingText, category) {
    // 清空内容
    blessingContent.innerHTML = '';

    // 创建祝福语元素
    const blessingElement = document.createElement('div');
    blessingElement.className = 'blessing-text';
    blessingElement.innerHTML = blessingText;

    // 添加类别标签
    const categoryElement = document.createElement('div');
    categoryElement.className = 'blessing-category';
    categoryElement.textContent = `✨ ${category} ✨`;
    categoryElement.style.cssText = `
        text-align: center;
        margin-top: 15px;
        font-size: 0.9rem;
        color: #ff4500;
        font-weight: bold;
        opacity: 0.8;
    `;

    // 添加到页面
    blessingContent.appendChild(blessingElement);
    blessingContent.appendChild(categoryElement);

    // 添加显示动画
    blessingElement.style.animation = 'textFadeIn 0.5s ease-out';
}

// 重置祝福语显示
function resetBlessingDisplay() {
    blessingContent.innerHTML = `
        <div class="blessing-placeholder">
            <i class="fas fa-sparkles"></i>
            <p>点击"生成祝福"按钮，获取您的新春祝福语</p>
        </div>
    `;
    currentBlessing = '';
}

// 处理复制按钮点击
function handleCopyClick() {
    if (!currentBlessing) {
        showMessage('请先生成祝福语', 'warning');
        return;
    }

    // 提取纯文本（去除HTML标签）
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentBlessing;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    // 使用现代Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(plainText)
            .then(() => {
                showMessage('祝福语已复制到剪贴板！', 'success');
                animateCopyButton();
            })
            .catch(err => {
                console.error('复制失败:', err);
                fallbackCopy(plainText);
            });
    } else {
        // 降级方案
        fallbackCopy(plainText);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showMessage('祝福语已复制到剪贴板！', 'success');
            animateCopyButton();
        } else {
            showMessage('复制失败，请手动复制', 'error');
        }
    } catch (err) {
        console.error('复制失败:', err);
        showMessage('复制失败，请手动复制', 'error');
    }

    document.body.removeChild(textArea);
}

// 处理重新生成按钮点击
function handleRefreshClick() {
    if (!currentName) {
        showMessage('请输入您的名字', 'warning');
        nameInput.focus();
        return;
    }

    // 随机选择一个不同的模板
    let newTemplate;
    do {
        newTemplate = blessingTemplates[Math.floor(Math.random() * blessingTemplates.length)];
    } while (newTemplate.template.replace('{name}', currentName) === currentBlessing);

    // 生成新的祝福语
    generateBlessing(newTemplate);

    // 添加按钮动画效果
    animateRefreshButton();
}

// 显示消息提示
function showMessage(text, type = 'success') {
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = text;

    // 添加到容器
    messageContainer.appendChild(messageElement);

    // 3秒后自动移除
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (messageElement.parentNode) {
                    messageContainer.removeChild(messageElement);
                }
            }, 300);
        }
    }, 3000);
}

// 动画效果函数
function animateGenerateButton() {
    const btn = generateBtn;
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 150);
}

function animateCopyButton() {
    const btn = copyBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
    btn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = 'linear-gradient(45deg, #2196F3, #1976D2)';
    }, 2000);
}

function animateRefreshButton() {
    const btn = refreshBtn;
    btn.style.transform = 'rotate(360deg)';
    btn.style.transition = 'transform 0.5s ease';

    setTimeout(() => {
        btn.style.transform = '';
    }, 500);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter 生成祝福
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerateClick();
    }

    // Ctrl/Cmd + C 复制祝福语
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && currentBlessing) {
        e.preventDefault();
        handleCopyClick();
    }

    // F5 重新生成
    if (e.key === 'F5') {
        e.preventDefault();
        handleRefreshClick();
    }
});

// 添加页面可见性变化监听
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 页面重新获得焦点时，让输入框重新获得焦点
        nameInput.focus();
    }
});

// 添加触摸设备优化
if ('ontouchstart' in window) {
    // 为触摸设备添加额外的样式类
    document.body.classList.add('touch-device');

    // 优化按钮触摸反馈
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        btn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});