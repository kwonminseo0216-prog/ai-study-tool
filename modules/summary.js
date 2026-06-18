/**
 * 5. 구조화 요약 리포트 화면 렌더링 모듈
 * @param {Object} summaryData - 4번 modules/analysis.js에서 생성된 요약 데이터 객체
 */
export function renderSummary(summaryData) {
    const summaryContainer = document.getElementById('summary-content');
    if (!summaryContainer) return;

    if (!summaryData) {
        summaryContainer.innerHTML = `<div class="placeholder-text">요약 데이터를 불러올 수 없습니다.</div>`;
        return;
    }

    // 핵심 포인트들을 HTML 리스트 항목(<li>)으로 변환
    const pointsHtml = summaryData.points
        .map(point => `<li><i class="fa-solid fa-check text-primary"></i> ${point}</li>`)
        .join('');

    // 최종 화면 HTML 조립 및 주입
    summaryContainer.innerHTML = `
        <div class="summary-wrapper" style="animation: fadeIn 0.5s ease;">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--theme-primary); margin-bottom: 12px;">
                ${summaryData.title}
            </h4>
            <p style="font-size: 0.9rem; color: var(--text-main); background-color: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); margin-bottom: 16px; border-left: 4px solid var(--theme-accent);">
                ${summaryData.overview}
            </p>
            <ul class="summary-points" style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                ${pointsHtml}
            </ul>
        </div>
    `;
}
