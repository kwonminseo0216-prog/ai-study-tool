/**
 * 11. 핵심 키워드 빈도 시각화 차트 렌더링 모듈
 * @param {Array} keywords - 4번 modules/analysis.js에서 생성된 키워드 배열 데이터 [{text: '교육', value: 15}, ...]
 */
export function renderChart(keywords) {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;

    if (!keywords || keywords.length === 0) {
        chartContainer.innerHTML = `<div class="placeholder-text">시각화할 키워드 데이터가 없습니다.</div>`;
        return;
    }

    // 1. 차트 레이아웃 틀 먼저 생성 (차트 영역과 워드클라우드 영역이 들어갈 뼈대)
    chartContainer.innerHTML = `
        <div id="local-chart-wrapper" style="animation: fadeIn 0.5s ease; display: flex; flex-direction: column; gap: 14px;">
            <div id="bar-chart-zone" style="display: flex; flex-direction: column; gap: 10px;"></div>
            <div id="wordcloud-zone" style="margin-top: 16px; padding-top: 16px; border-top: 1px dashed var(--border-color); display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;"></div>
        </div>
    `;

    const barChartZone = document.getElementById('bar-chart-zone');
    if (!barChartZone) return;

    // 2. 최대 빈도수를 찾아서 비율(%) 계산의 기준으로 삼음
    const maxVal = Math.max(...keywords.map(k => k.value));

    // 3. 순수 CSS 스케일링을 이용해 정밀한 막대그래프 동적 생성
    keywords.forEach(item => {
        const percentage = maxVal > 0 ? (item.value / maxVal) * 100 : 0;

        const row = document.createElement('div');
        row.style.cssText = 'display: flex; align-items: center; font-size: 0.85rem;';

        row.innerHTML = `
            <div style="width: 70px; font-weight: 500; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color: var(--text-main);">
                ${item.text}
            </div>
            <div style="flex-grow: 1; background-color: var(--bg-secondary); height: 16px; border-radius: 4px; overflow: hidden; margin: 0 12px; position: relative;">
                <div style="width: ${percentage}%; background: linear-gradient(90deg, var(--theme-accent) 0%, var(--theme-primary) 100%); height: 100%; border-radius: 4px; transition: width 0.6s ease-out;"></div>
            </div>
            <div style="width: 35px; text-align: right; font-weight: 600; color: var(--text-muted);">
                ${item.value}회
            </div>
        `;
        barChartZone.appendChild(row);
    });
}
