/**
 * 16. 핵심 키워드 워드클라우드 시각화 렌더링 모듈
 * @param {Array} keywords - 4번 modules/analysis.js에서 생성된 키워드 배열 데이터
 */
export function renderWordCloud(keywords) {
    // 11번 graph.js가 만들어둔 워드클라우드 전용 구역(Zone)을 찾아옵니다.
    const cloudZone = document.getElementById('wordcloud-zone');
    if (!cloudZone) return;

    if (!keywords || keywords.length === 0) {
        cloudZone.innerHTML = '';
        return;
    }

    cloudZone.innerHTML = ''; // 기존 내용 초기화

    // 감각적인 워드클라우드를 위한 세련된 5가지 로컬 색상 칩
    const colorPalette = ['#2563eb', '#3b82f6', '#0ea5e9', '#38bdf8', '#1d4ed8'];

    // 키워드 배열을 순회하며 빈도수에 맞는 크기와 색상으로 배치
    keywords.forEach((item, index) => {
        const wordSpan = document.createElement('span');
        
        // 빈도수(value)에 따라 글자 크기를 최소 0.8rem에서 최대 1.8rem까지 동적 연산
        const fontSize = Math.min(0.8 + (item.value * 0.08), 1.8);
        // 인덱스를 활용해 색상 배열에서 어울리는 색 선택
        const color = colorPalette[index % colorPalette.length];
        // 빈도수가 높을수록 글씨를 더 두껍게 설정
        const fontWeight = item.value > 8 ? '700' : '500';

        // 단어 스타일 주입
        wordSpan.style.cssText = `
            font-size: ${fontSize}rem;
            color: ${color};
            font-weight: ${fontWeight};
            padding: 4px 8px;
            border-radius: 4px;
            background-color: var(--bg-main);
            transition: transform 0.2s ease;
            cursor: default;
            display: inline-block;
        `;

        // 마우스 올렸을 때 살짝 커지는 효과 추가
        wordSpan.addEventListener('mouseenter', () => wordSpan.style.transform = 'scale(1.1)');
        wordSpan.addEventListener('mouseleave', () => wordSpan.style.transform = 'scale(1.0)');

        wordSpan.innerText = item.text;
        cloudZone.appendChild(wordSpan);
    });
}
