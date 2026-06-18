import { AppState } from '../app.js';
import { renderSummary } from './summary.js';
import { renderQuestions } from './question.js';
import { renderVocab } from './vocab.js';
import { renderChart } from './graph.js';
import { renderWordCloud } from './wordcloud.js';
import { renderMermaidDiagram } from './mermaid.js';

/**
 * 4. 지문 분석 파이프라인 핸들러
 * 입력된 지문을 기반으로 로컬에서 즉시 교육학 분석 데이터를 생성하여 각 화면에 배분합니다.
 */
export async function handleAnalysisPipeline() {
    const textInput = document.getElementById('passage-input')?.value.trim();
    
    // 지문 입력 검증
    if (!textInput) {
        alert("📌 분석할 지문을 입력해 주세요!");
        return;
    }

    // 버튼을 '분석 중' 로딩 상태로 변경
    const analyzerBtn = document.getElementById('analyze-btn');
    if (analyzerBtn) {
        analyzerBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI 심층 분석 중...`;
        analyzerBtn.disabled = true;
    }

    // 실제 AI 분석 느낌을 내기 위해 1초(1000ms) 뒤에 실행
    setTimeout(() => {
        // 1. 입력된 지문을 기반으로 데이터 생성
        const mockResult = generateMockAnalysisData(textInput);
        
        // 2. 전역 상태(AppState)에 결과 기록
        AppState.currentData = mockResult;

        // 3. 각각의 하위 컴포넌트 모듈을 호출하여 화면에 내용 그리기
        if (typeof renderSummary === 'function') renderSummary(mockResult.summary);
        if (typeof renderQuestions === 'function') renderQuestions(mockResult.questions);
        if (typeof renderVocab === 'function') renderVocab(mockResult.vocabulary);
        if (typeof renderChart === 'function') renderChart(mockResult.keywords);
        if (typeof renderWordCloud === 'function') renderWordCloud(mockResult.keywords);
        if (typeof renderMermaidDiagram === 'function') renderMermaidDiagram(mockResult.structure);

        // 4. 로딩 완료 후 버튼 원상복구
        if (analyzerBtn) {
            analyzerBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> AI 심층 분석 시작`;
            analyzerBtn.disabled = false;
        }
        
        console.log("🎯 로컬 지문 분석 및 대시보드 부품 조립 완료!");
    }, 1000);
}

/**
 * 내부 데이터 생성기: 입력된 텍스트를 일부 결합한 교육학 표준 가짜 데이터 생성
 */
function generateMockAnalysisData(text) {
    const textSnippet = text.length > 25 ? text.substring(0, 25) + "..." : text;

    return {
        summary: {
            title: "📘 고등 교육학 지문 구조적 리포트",
            overview: `제시된 지문은 교육의 본질적인 목적(내재적 가치)과 수단으로서의 목적(외재적 가치) 간의 유기적 관계를 논하고 있습니다. 특히 본문 중 [${textSnippet}] 부분은 교육과 사회의 상호작용을 이해하는 핵심 논거입니다.`,
            points: [
                "내재적 목적: 지식의 확장, 자아실현, 도덕적 품성 도야 등 교육 그 자체가 목적이 됨.",
                "외재적 목적: 경제적 생산성 향상, 사회적 지위 획득, 국가 발전의 수단으로 활용됨.",
                "결론적 제언: 현대 교육학은 이 두 가치가 대립각을 세우기보다 상호보완적 균형을 이루어야 함을 역설함."
            ]
        },
        questions: [
            {
                id: 1,
                type: "multiple",
                question: "윗글의 내용에 근거할 때, 교육의 '내재적 목적'에 부합하는 서술로 가장 적절한 것은?",
                options: [
                    "좋은 직장에 취업하기 위해 전공 지식을 쌓는다.",
                    "합리적 사고 능력을 키워 인간으로서의 지적 성장을 도모한다.",
                    "국가의 경제 성장에 이바지할 전문 기술 인력을 양성한다.",
                    "사회적 신분 상승과 가문의 명예를 높이기 위해 진학한다."
                ],
                answer: 2,
                explanation: "지적 성장과 합리적 사고 능력 도야는 교육 그 자체를 목적으로 하는 대표적인 내재적 가치입니다. 나머지 선지는 외부적 보상을 바라는 외재적 목적입니다."
            },
            {
                id: 2,
                type: "subjective",
                question: "교육을 사회적 출세나 경제적 수단으로 여기는 관점과 가장 핵심적으로 대립하는 교육의 본질적 가치를 두 글자의 한자어로 서술하시오.",
                answer: "내재",
                explanation: "수단으로 전락한 '외재적 목적'에 맞서 교육 본연의 가치를 강조하는 개념은 '내재적 목적(가치)'입니다."
            }
        ],
        vocabulary: [
            { word: "내재적 (Intrinsic)", meaning: "외부적 요인에 의하지 않고, 현상이나 사물 자체에 본질적으로 내포되어 있는 성질" },
            { word: "외재적 (Extrinsic)", meaning: "사물 자체의 본질이 아닌, 외부의 다른 목적을 달성하기 위한 도구나 수단이 되는 성질" },
            { word: "도야 (Cultivation)", meaning: "몸과 마음을 닦아 훌륭한 인격이나 능력을 기르고 가다듬음" }
        ],
        keywords: [
            { text: "교육", value: 15 },
            { text: "가치", value: 11 },
            { text: "내재적", value: 8 },
            { text: "외재적", value: 7 },
            { text: "목적", value: 5 }
        ],
        structure: "graph TD\nA[교육의 이중성] --> B(내재적 가치: 인격 도야)\nA --> C(외재적 가치: 사회적 수단)\nB --> D{상호보완적 융합}\nC --> D"
    };
}
