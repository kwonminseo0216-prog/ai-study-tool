/**
 * 6. AI 변형 문제(퀴즈) 화면 렌더링 및 채점 모듈
 * @param {Array} questions - 4번 modules/analysis.js에서 생성된 퀴즈 배열 데이터
 */
export function renderQuestions(questions) {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    if (!questions || questions.length === 0) {
        quizContainer.innerHTML = `<div class="placeholder-text">출제된 문제가 없습니다.</div>`;
        return;
    }

    quizContainer.innerHTML = ''; // 기존 내용 초기화

    questions.forEach((q, index) => {
        const qCard = document.createElement('div');
        qCard.className = 'quiz-item-box';
        qCard.style.cssText = 'margin-bottom: 24px; padding: 16px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--card-bg);';

        // 공통: 문제 발문 생성
        let quizHtml = `
            <p style="font-weight: 600; margin-bottom: 12px; font-size: 0.95rem;">
                <span style="color: var(--theme-primary);">Q${index + 1}.</span> ${q.question}
            </p>
        `;

        if (q.type === 'multiple') {
            // 객관식 선지 조립 (1~4번 라디오 버튼)
            const optionsHtml = q.options.map((opt, oIdx) => `
                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 0.9rem; cursor: pointer;">
                    <input type="radio" name="quiz-${q.id}" value="${oIdx + 1}">
                    <span>${oIdx + 1}. ${opt}</span>
                </label>
            `).join('');

            quizHtml += `
                <div class="quiz-options" style="margin-bottom: 12px;">${optionsHtml}</div>
                <button class="btn btn-primary" id="btn-submit-${q.id}" style="padding: 6px 12px; font-size: 0.8rem;">정답 제출</button>
            `;
        } else if (q.type === 'subjective') {
            // 주관식 입력창 조립
            quizHtml += `
                <div class="quiz-options" style="margin-bottom: 12px;">
                    <input type="text" id="input-${q.id}" placeholder="정답을 입력하세요" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-md); font-size: 0.9rem; outline: none;">
                </div>
                <button class="btn btn-primary" id="btn-submit-${q.id}" style="padding: 6px 12px; font-size: 0.8rem;">정답 제출</button>
            `;
        }

        // 결과 및 해설창 뼈대 미리 생성 (숨김 처리)
        quizHtml += `
            <div id="result-${q.id}" style="display: none; margin-top: 12px; padding: 10px; border-radius: var(--radius-md); font-size: 0.85rem;"></div>
        `;

        qCard.innerHTML = quizHtml;
        quizContainer.appendChild(qCard);

        // 채점 버튼 리스너 바인딩
        const submitBtn = qCard.querySelector(`#btn-submit-${q.id}`);
        if (submitBtn) {
            submitBtn.addEventListener('click', () => gradeQuestion(q, qCard));
        }
    });
}

/**
 * 내부 채점 로직 함수
 */
function gradeQuestion(q, qCard) {
    const resultBox = qCard.querySelector(`#result-${q.id}`);
    const submitBtn = qCard.querySelector(`#btn-submit-${q.id}`);
    if (!resultBox) return;

    let isCorrect = false;
    let userAnswer = '';

    if (q.type === 'multiple') {
        const selectedRadio = qCard.querySelector(`input[name="quiz-${q.id}"]:checked`);
        if (!selectedRadio) {
            alert('정답을 선택해 주세요!');
            return;
        }
        userAnswer = parseInt(selectedRadio.value);
        isCorrect = (userAnswer === q.answer);
    } else if (q.type === 'subjective') {
        const textInput = qCard.querySelector(`#input-${q.id}`);
        userAnswer = textInput ? textInput.value.trim() : '';
        if (!userAnswer) {
            alert('정답을 입력해 주세요!');
            return;
        }
        isCorrect = userAnswer.includes(q.answer); // 키워드 포함 여부 검사
    }

    // 채점 결과 화면 스타일 업데이트 및 피드백 출력
    resultBox.style.display = 'block';
    if (isCorrect) {
        resultBox.style.backgroundColor = '#dcfce7';
        resultBox.style.color = '#166534';
        resultBox.style.border = '1px solid #bbf7d0';
        resultBox.innerHTML = `<strong>🎉 정답입니다!</strong><br><br>${q.explanation}`;
    } else {
        resultBox.style.backgroundColor = '#fee2e2';
        resultBox.style.color = '#991b1b';
        resultBox.style.border = '1px solid #fecaca';
        const correctDisplay = q.type === 'multiple' ? `${q.answer}번` : `[${q.answer}]`;
        resultBox.innerHTML = `<strong>❌ 오답입니다.</strong> (내가 쓴 답: ${userAnswer} / 정답: ${correctDisplay})<br><br>${q.explanation}`;
    }

    // 한 번 제출하면 버튼 비활성화
    if (submitBtn) submitBtn.disabled = true;
}
