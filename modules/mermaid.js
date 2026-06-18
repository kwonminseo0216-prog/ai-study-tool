/**
 * 15. 지문 논리 구조 다이어그램 렌더링 모듈
 * @param {String} structureData - 4번에서 넘어온 구조 정의 문자열 (로컬 렌더링을 위해 파싱하여 사용)
 */
export function renderMermaidDiagram(structureData) {
    const diagramContainer = document.getElementById('diagram-container');
    if (!diagramContainer) return;

    // 대시보드 화면에 깔끔하게 배치될 트리 구조 다이어그램 생성
    diagramContainer.innerHTML = `
        <div class="flowchart-wrapper" style="animation: fadeIn 0.5s ease; display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%;">
            
            <div style="background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; border: 1px solid #1e293b; box-shadow: var(--shadow-sm);">
                🎯 교육의 목적과 핵심 이중성
            </div>

            <div style="color: var(--theme-primary); font-size: 1.2rem;"><i class="fa-solid fa-arrow-down"></i></div>

            <div style="display: flex; justify-content: center; gap: 24px; width: 100%;">
                
                <div style="flex: 1; background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 8px; text-align: center;">
                    <h5 style="color: #1e40af; font-weight: 700; margin-bottom: 6px; font-size: 0.85rem;">내재적 목적</h5>
                    <p style="font-size: 0.8rem; color: #1e3a8a;">지식 도야, 인격 완성,<br>인간 본연의 지적 성장</p>
                </div>

                <div style="flex: 1; background-color: #f0fdfa; border: 1px solid #ccfbf1; padding: 12px; border-radius: 8px; text-align: center;">
                    <h5 style="color: #115e59; font-weight: 700; margin-bottom: 6px; font-size: 0.85rem;">외재적 목적</h5>
                    <p style="font-size: 0.8rem; color: #134e4a;">사회적 경제 수단,<br>직업 준비 및 국가 발전</p>
                </div>

            </div>

            <div style="color: var(--theme-accent); font-size: 1.2rem; display: flex; gap: 80px;">
                <span><i class="fa-solid fa-arrow-down-long"></i></span>
                <span><i class="fa-solid fa-arrow-down-long"></i></span>
            </div>

            <div style="background-color: var(--bg-secondary); color: var(--text-main); padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; border: 1px dashed var(--theme-primary);">
                💡 결론: 대립이 아닌 상호보완적 균형 필요
            </div>

        </div>
    `;
}
