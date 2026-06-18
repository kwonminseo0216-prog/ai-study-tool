/**
 * 7. 중요 단어장 화면 렌더링 모듈
 * @param {Array} vocabData - 4번 modules/analysis.js에서 생성된 단어 배열 데이터
 */
export function renderVocab(vocabData) {
    const vocabContainer = document.getElementById('vocab-container');
    if (!vocabContainer) return;

    if (!vocabData || vocabData.length === 0) {
        vocabContainer.innerHTML = `<div class="placeholder-text">추출된 핵심 단어가 없습니다.</div>`;
        return;
    }

    // 단어 데이터를 표(Table) 행 구조로 변환
    const tableRowsHtml = vocabData.map((item, idx) => `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 10px 8px; font-weight: 600; color: var(--theme-primary); font-size: 0.9rem;">
                ${idx + 1}. ${item.word}
            </td>
            <td style="padding: 10px 8px; color: var(--text-main); font-size: 0.85rem; line-height: 1.4;">
                ${item.meaning}
            </td>
        </tr>
    `).join('');

    // 깔끔한 표 레이아웃으로 감싸서 화면에 주입
    vocabContainer.innerHTML = `
        <div class="vocab-table-wrapper" style="animation: fadeIn 0.5s ease; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--theme-primary); background-color: var(--bg-secondary);">
                        <th style="padding: 10px 8px; font-size: 0.85rem; font-weight: 600; width: 35%;">핵심 어휘</th>
                        <th style="padding: 10px 8px; font-size: 0.85rem; font-weight: 600; width: 65%;">문맥상 의미 풀이</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRowsHtml}
                </tbody>
            </table>
        </div>
    `;
}
