const carouselImages = document.querySelectorAll('.carousel-image');
let currentImageIndex = 0;

function changeVisibleImage() {
    carouselImages.forEach((img, index) => {
        if (index === currentImageIndex) {
            img.classList.add('visible');
        } else {
            img.classList.remove('visible');
        }
    });

    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
}

changeVisibleImage();
setInterval(changeVisibleImage, 3000);

const AI_API_KEY = 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
const aiForm = document.getElementById('ai-form');
const aiQuestion = document.getElementById('ai-question');
const aiAnswer = document.getElementById('ai-answer');

async function fetchAiResponse(question) {
    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data.answer;
}

    const data = await response.json();
    return data.choices && data.choices[0] && data.choices[0].text.trim();
}

aiForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const question = aiQuestion.value;
    if (!question) return;

    const prompt = `问题: ${question}\n回答: `;
    const answer = await fetchAiResponse(prompt);
    aiAnswer.value = answer;

document.addEventListener("DOMContentLoaded", function () {
    // 初始化剩余提问次数
    let remainingQuestions = 3;

    // 为“提问”按钮添加事件监听器
    document.getElementById("ask").addEventListener("click", function () {
        // 检查剩余提问次数
        if (remainingQuestions <= 0) {
            alert('您已达到提问次数限制。');
            return;
        }

        // 获取用户输入
        const questionInput = document.getElementById("question-input");
        const question = questionInput.value.trim();

        // 如果用户输入为空，不执行后续操作
        if (!question) {
            return;
        }

        // 设置请求选项
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        };

        // 向服务器发送请求以获取答案
        fetch("/get-answer", requestOptions)
            .then(response => response.json())
            .then(data => {
                // 更新剩余提问次数
                remainingQuestions -= 1;
                document.getElementById('question-count').textContent = remainingQuestions;

                // 处理返回的答案（例如：在网页上显示答案）
                const answer = data.answer;
                const answerElement = document.getElementById("answer");
                answerElement.innerHTML = answer;

                // 清空输入框
                questionInput.value = "";
            })
            .catch(error => {
                console.error('Error fetching answer:', error);
            });
    });
});


