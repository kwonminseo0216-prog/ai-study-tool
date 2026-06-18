// 4번 분석 파이프라인 및 기능 모듈들 가져오기
import { handleAnalysisPipeline } from './modules/analysis.js';
import { initAiTeacher } from './modules/aiTeacher.js';
import { initDragDictionary } from './modules/dictionary.js';

/**
 * 전역 애플리케이션 상태 관리 객체 (AppState)
 * 분석된 가짜 데이터나 히스토리를 세션 동안 보관합니다.
 */
export const AppState = {
    currentData: null,
    history: []
};

/**
 * 대시보드 애플리케이션 초기화 구동
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 에듀 대시보드가 로컬 오프라인 모드로 시동되었습니다.");

    // 1. [AI 심층 분석 시작] 버튼 이벤트 연결
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', handleAnalysisPipeline);
    }

    // 2. 22번 1:1 AI 멘토 챗봇 기능 초기화 실행
    if (typeof initAiTeacher === 'function') {
        initAiTeacher();
    }

    // 3. 23번 실시간 드래그 사전 기능 초기화 실행
    if (typeof initDragDictionary === 'function') {
        initDragDictionary();
    }
});
