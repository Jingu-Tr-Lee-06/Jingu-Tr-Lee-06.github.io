
// 전역 변수
let chemicals = [];
let categories = new Set();
let currentEditId = null;
let currentPage = 1;
let itemsPerPage = 10;
let filteredChemicals = [];

// 초기 화학물질 데이터 (200개)
const initialChemicals = [
    { name: "물", formula: "H₂O", category: "무기화합물", description: "생명에 필수적인 액체로 모든 생명체의 주요 구성 성분" },
    { name: "이산화탄소", formula: "CO₂", category: "무기화합물", description: "광합성의 원료이며 온실가스의 주요 성분" },
    { name: "암모니아", formula: "NH₃", category: "무기화합물", description: "자극적 냄새의 무색 기체로 비료 생산의 핵심 원료" },
    { name: "염화나트륨", formula: "NaCl", category: "무기화합물", description: "식탁염으로 알려진 백색 결정성 고체" },
    { name: "황산", formula: "H₂SO₄", category: "무기화합물", description: "강산성 무색 액체로 산업에서 가장 많이 생산되는 화학물질" },
    { name: "염산", formula: "HCl", category: "무기화합물", description: "강산성 용액으로 위산의 주성분" },
    { name: "질산", formula: "HNO₃", category: "무기화합물", description: "강한 산화력을 가진 무색 액체" },
    { name: "수산화나트륨", formula: "NaOH", category: "무기화합물", description: "가성소다로 불리는 강염기성 백색 고체" },
    { name: "과산화수소", formula: "H₂O₂", category: "무기화합물", description: "소독제와 표백제로 사용되는 무색 액체" },
    { name: "산화칼슘", formula: "CaO", category: "무기화합물", description: "생석회로 불리며 건축 재료로 사용" },
    { name: "탄산칼슘", formula: "CaCO₃", category: "무기화합물", description: "석회석의 주성분이며 제산제로 사용" },
    { name: "산화철", formula: "Fe₂O₃", category: "무기화합물", description: "녹의 주성분인 적갈색 고체" },
    { name: "황화수소", formula: "H₂S", category: "무기화합물", description: "썩은 달걀 냄새가 나는 유독성 기체" },
    { name: "이산화황", formula: "SO₂", category: "무기화합물", description: "산성비의 원인 물질이며 보존제로 사용" },
    { name: "일산화탄소", formula: "CO", category: "무기화합물", description: "무색무취의 유독성 기체" },
    { name: "산화알루미늄", formula: "Al₂O₃", category: "무기화합물", description: "알루미나로 불리며 연마재와 세라믹 원료" },
    { name: "질소", formula: "N₂", category: "무기화합물", description: "대기의 78%를 차지하는 무색무취 기체" },
    { name: "산소", formula: "O₂", category: "무기화합물", description: "호흡과 연소에 필수적인 기체" },
    { name: "수소", formula: "H₂", category: "무기화합물", description: "가장 가벼운 원소로 청정 에너지원" },
    { name: "오존", formula: "O₃", category: "무기화합물", description: "자외선을 차단하는 청색 기체" },
    { name: "인산", formula: "H₃PO₄", category: "무기화합물", description: "비료와 세제 제조에 사용되는 산" },
    { name: "탄산나트륨", formula: "Na₂CO₃", category: "무기화합물", description: "소다회로 불리며 유리 제조에 사용" },
    { name: "염화칼슘", formula: "CaCl₂", category: "무기화합물", description: "제설제와 건조제로 사용되는 흡습성 물질" },
    { name: "황산칼슘", formula: "CaSO₄", category: "무기화합물", description: "석고의 주성분으로 건축 재료" },
    { name: "수산화칼슘", formula: "Ca(OH)₂", category: "무기화합물", description: "소석회로 불리며 건축과 농업에 사용" },
    { name: "질산암모늄", formula: "NH₄NO₃", category: "무기화합물", description: "질소 비료의 주요 성분" },
    { name: "황산암모늄", formula: "(NH₄)₂SO₄", category: "무기화합물", description: "비료로 널리 사용되는 무기염" },
    { name: "염화암모늄", formula: "NH₄Cl", category: "무기화합물", description: "전지와 납땜 플럭스에 사용" },
    { name: "탄산수소나트륨", formula: "NaHCO₃", category: "무기화합물", description: "베이킹소다로 알려진 제빵 팽창제" },
    { name: "과망간산칼륨", formula: "KMnO₄", category: "무기화합물", description: "자주색 결정으로 소독과 산화제로 사용" },
    { name: "염소", formula: "Cl₂", category: "무기화합물", description: "황록색 유독성 기체로 소독제" },
    { name: "불소", formula: "F₂", category: "무기화합물", description: "가장 반응성이 높은 담황색 기체" },
    { name: "브롬", formula: "Br₂", category: "무기화합물", description: "적갈색 휘발성 액체 할로겐" },
    { name: "요오드", formula: "I₂", category: "무기화합물", description: "자주색 결정으로 소독제로 사용" },
    { name: "산화마그네슘", formula: "MgO", category: "무기화합물", description: "내화 재료와 제산제로 사용" },
    { name: "황산마그네슘", formula: "MgSO₄", category: "무기화합물", description: "엡솜염으로 알려진 하제" },
    { name: "염화마그네슘", formula: "MgCl₂", category: "무기화합물", description: "두부 응고제와 제설제" },
    { name: "산화아연", formula: "ZnO", category: "무기화합물", description: "백색 안료와 자외선 차단제" },
    { name: "황산아연", formula: "ZnSO₄", category: "무기화합물", description: "영양 보충제와 농업용 비료" },
    { name: "염화칼륨", formula: "KCl", category: "무기화합물", description: "칼륨 비료와 소금 대체제" },
    { name: "질산칼륨", formula: "KNO₃", category: "무기화합물", description: "초석으로 불리며 화약 제조에 사용" },
    { name: "탄산칼륨", formula: "K₂CO₃", category: "무기화합물", description: "유리와 비누 제조에 사용" },
    { name: "황산구리", formula: "CuSO₄", category: "무기화합물", description: "청색 결정으로 살균제와 안료" },
    { name: "산화구리", formula: "CuO", category: "무기화합물", description: "흑색 분말로 도자기 안료" },
    { name: "질산은", formula: "AgNO₃", category: "무기화합물", description: "사진 현상과 소독제로 사용" },
    { name: "염화은", formula: "AgCl", category: "무기화합물", description: "감광성 물질로 사진 필름에 사용" },
    { name: "산화수은", formula: "HgO", category: "무기화합물", description: "적색 또는 황색 분말 수은 화합물" },
    { name: "산화납", formula: "PbO", category: "무기화합물", description: "황색 분말로 유리와 배터리 제조" },
    { name: "이산화규소", formula: "SiO₂", category: "무기화합물", description: "석영과 모래의 주성분" },
    { name: "탄화규소", formula: "SiC", category: "무기화합물", description: "매우 단단한 연마재" },
    { name: "메탄", formula: "CH₄", category: "유기화합물", description: "가장 간단한 탄화수소로 천연가스의 주성분" },
    { name: "에탄", formula: "C₂H₆", category: "유기화합물", description: "무색무취의 가연성 기체" },
    { name: "프로판", formula: "C₃H₈", category: "유기화합물", description: "LPG의 주성분으로 연료로 사용" },
    { name: "부탄", formula: "C₄H₁₀", category: "유기화합물", description: "휴대용 가스의 연료" },
    { name: "에틸렌", formula: "C₂H₄", category: "유기화합물", description: "플라스틱 원료이며 식물 호르몬" },
    { name: "아세틸렌", formula: "C₂H₂", category: "유기화합물", description: "용접과 절단에 사용되는 고온 연료" },
    { name: "벤젠", formula: "C₆H₆", category: "유기화합물", description: "방향족 화합물의 기본 구조" },
    { name: "톨루엔", formula: "C₇H₈", category: "유기화합물", description: "용매와 화학 원료로 사용" },
    { name: "메탄올", formula: "CH₃OH", category: "유기화합물", description: "목정으로 불리는 독성 알코올" },
    { name: "에탄올", formula: "C₂H₅OH", category: "유기화합물", description: "주류의 주성분이며 연료로도 사용" },
    { name: "글리세롤", formula: "C₃H₈O₃", category: "유기화합물", description: "보습제로 사용되는 3가 알코올" },
    { name: "아세트산", formula: "CH₃COOH", category: "유기화합물", description: "식초의 주성분인 유기산" },
    { name: "포름산", formula: "HCOOH", category: "유기화합물", description: "개미산으로 불리는 가장 간단한 카르복시산" },
    { name: "옥살산", formula: "C₂H₂O₄", category: "유기화합물", description: "수산으로 불리며 표백제와 세척제" },
    { name: "아세톤", formula: "C₃H₆O", category: "유기화합물", description: "매니큐어 리무버와 용매로 사용" },
    { name: "포름알데히드", formula: "CH₂O", category: "유기화합물", description: "방부제와 수지 제조에 사용" },
    { name: "아세트알데히드", formula: "C₂H₄O", category: "유기화합물", description: "알코올 대사 중간체" },
    { name: "요소", formula: "CO(NH₂)₂", category: "유기화합물", description: "질소 비료와 화장품 원료" },
    { name: "구연산", formula: "C₆H₈O₇", category: "유기화합물", description: "감귤류에 함유된 신맛 물질" },
    { name: "젖산", formula: "C₃H₆O₃", category: "유기화합물", description: "근육 피로 물질이며 발효 산물" },
    { name: "아스코르브산", formula: "C₆H₈O₆", category: "유기화합물", description: "비타민 C로 알려진 항산화제" },
    { name: "아세트산에틸", formula: "C₄H₈O₂", category: "유기화합물", description: "과일 향이 나는 용매" },
    { name: "염화메틸렌", formula: "CH₂Cl₂", category: "유기화합물", description: "페인트 제거제와 용매" },
    { name: "클로로포름", formula: "CHCl₃", category: "유기화합물", description: "과거 마취제로 사용된 용매" },
    { name: "사염화탄소", formula: "CCl₄", category: "유기화합물", description: "세척제와 소화기에 사용되던 물질" },
    { name: "에틸렌글리콜", formula: "C₂H₆O₂", category: "유기화합물", description: "부동액의 주성분" },
    { name: "프로필렌글리콜", formula: "C₃H₈O₂", category: "유기화합물", description: "식품과 화장품 보습제" },
    { name: "페놀", formula: "C₆H₅OH", category: "유기화합물", description: "석탄산으로 불리는 소독제" },
    { name: "아닐린", formula: "C₆H₅NH₂", category: "유기화합물", description: "염료와 약품 합성 원료" },
    { name: "니트로벤젠", formula: "C₆H₅NO₂", category: "유기화합물", description: "아닐린 제조의 중간체" },
    { name: "스티렌", formula: "C₈H₈", category: "유기화합물", description: "폴리스티렌 플라스틱 원료" },
    { name: "나프탈렌", formula: "C₁₀H₈", category: "유기화합물", description: "방충제로 사용되는 방향족 탄화수소" },
    { name: "안트라센", formula: "C₁₄H₁₀", category: "유기화합물", description: "염료 합성의 중간체" },
    { name: "피리딘", formula: "C₅H₅N", category: "유기화합물", description: "의약품과 농약 합성 원료" },
    { name: "푸란", formula: "C₄H₄O", category: "유기화합물", description: "용매와 수지 제조 원료" },
    { name: "티오펜", formula: "C₄H₄S", category: "유기화합물", description: "의약품과 염료 합성 원료" },
    { name: "인돌", formula: "C₈H₇N", category: "유기화합물", description: "트립토판의 구조 단위" },
    { name: "아크릴산", formula: "C₃H₄O₂", category: "유기화합물", description: "아크릴 수지와 도료 원료" },
    { name: "말레산", formula: "C₄H₄O₄", category: "유기화합물", description: "불포화 폴리에스터 수지 원료" },
    { name: "숙신산", formula: "C₄H₆O₄", category: "유기화합물", description: "크렙스 회로의 중간체" },
    { name: "아디프산", formula: "C₆H₁₀O₄", category: "유기화합물", description: "나일론 6,6의 원료" },
    { name: "헥사메틸렌디아민", formula: "C₆H₁₆N₂", category: "유기화합물", description: "나일론 합성 원료" },
    { name: "테레프탈산", formula: "C₈H₆O₄", category: "유기화합물", description: "PET 플라스틱의 원료" },
    { name: "비스페놀A", formula: "C₁₅H₁₆O₂", category: "유기화합물", description: "폴리카보네이트와 에폭시 수지 원료" },
    { name: "카페인", formula: "C₈H₁₀N₄O₂", category: "유기화합물", description: "커피와 차에 함유된 각성제" },
    { name: "니코틴", formula: "C₁₀H₁₄N₂", category: "유기화합물", description: "담배의 주요 알칼로이드" },
    { name: "모르핀", formula: "C₁₇H₁₉NO₃", category: "유기화합물", description: "강력한 진통제" },
    { name: "코데인", formula: "C₁₈H₂₁NO₃", category: "유기화합물", description: "진해제로 사용되는 알칼로이드" },
    { name: "아스피린", formula: "C₉H₈O₄", category: "유기화합물", description: "해열진통제로 널리 사용" },
    { name: "파라세타몰", formula: "C₈H₉NO₂", category: "유기화합물", description: "아세트아미노펜으로 알려진 진통제" },
    { name: "글루코스", formula: "C₆H₁₂O₆", category: "생화학 화합물", description: "포도당으로 생명체의 주요 에너지원" },
    { name: "프룩토스", formula: "C₆H₁₂O₆", category: "생화학 화합물", description: "과당으로 과일의 단맛 성분" },
    { name: "갈락토스", formula: "C₆H₁₂O₆", category: "생화학 화합물", description: "유당의 구성 성분" },
    { name: "수크로스", formula: "C₁₂H₂₂O₁₁", category: "생화학 화합물", description: "설탕의 주성분" },
    { name: "락토스", formula: "C₁₂H₂₂O₁₁", category: "생화학 화합물", description: "유당으로 우유의 당 성분" },
    { name: "말토스", formula: "C₁₂H₂₂O₁₁", category: "생화학 화합물", description: "맥아당으로 전분 분해 산물" },
    { name: "셀룰로스", formula: "(C₆H₁₀O₅)n", category: "생화학 화합물", description: "식물 세포벽의 주성분" },
    { name: "전분", formula: "(C₆H₁₀O₅)n", category: "생화학 화합물", description: "식물의 저장 탄수화물" },
    { name: "글리코겐", formula: "(C₆H₁₀O₅)n", category: "생화학 화합물", description: "동물의 저장 탄수화물" },
    { name: "글리신", formula: "C₂H₅NO₂", category: "생화학 화합물", description: "가장 간단한 아미노산" },
    { name: "알라닌", formula: "C₃H₇NO₂", category: "생화학 화합물", description: "단백질 구성 아미노산" },
    { name: "발린", formula: "C₅H₁₁NO₂", category: "생화학 화합물", description: "필수 아미노산" },
    { name: "류신", formula: "C₆H₁₃NO₂", category: "생화학 화합물", description: "근육 형성에 중요한 필수 아미노산" },
    { name: "이소류신", formula: "C₆H₁₃NO₂", category: "생화학 화합물", description: "분지쇄 필수 아미노산" },
    { name: "페닐알라닌", formula: "C₉H₁₁NO₂", category: "생화학 화합물", description: "방향족 필수 아미노산" },
    { name: "티로신", formula: "C₉H₁₁NO₃", category: "생화학 화합물", description: "신경전달물질 전구체" },
    { name: "트립토판", formula: "C₁₁H₁₂N₂O₂", category: "생화학 화합물", description: "세로토닌 전구체인 필수 아미노산" },
    { name: "메티오닌", formula: "C₅H₁₁NO₂S", category: "생화학 화합물", description: "황 함유 필수 아미노산" },
    { name: "시스테인", formula: "C₃H₇NO₂S", category: "생화학 화합물", description: "이황화 결합 형성 아미노산" },
    { name: "세린", formula: "C₃H₇NO₃", category: "생화학 화합물", description: "인산화 부위를 제공하는 아미노산" },
    { name: "트레오닌", formula: "C₄H₉NO₃", category: "생화학 화합물", description: "수산기를 가진 필수 아미노산" },
    { name: "아스파르트산", formula: "C₄H₇NO₄", category: "생화학 화합물", description: "산성 아미노산" },
    { name: "글루탐산", formula: "C₅H₉NO₄", category: "생화학 화합물", description: "MSG의 구성 성분인 아미노산" },
    { name: "리신", formula: "C₆H₁₄N₂O₂", category: "생화학 화합물", description: "염기성 필수 아미노산" },
    { name: "아르기닌", formula: "C₆H₁₄N₄O₂", category: "생화학 화합물", description: "산화질소 생성에 관여하는 아미노산" },
    { name: "히스티딘", formula: "C₆H₉N₃O₂", category: "생화학 화합물", description: "이미다졸 고리를 가진 아미노산" },
    { name: "프롤린", formula: "C₅H₉NO₂", category: "생화학 화합물", description: "고리 구조를 가진 아미노산" },
    { name: "아데닌", formula: "C₅H₅N₅", category: "생화학 화합물", description: "DNA와 RNA의 퓨린 염기" },
    { name: "구아닌", formula: "C₅H₅N₅O", category: "생화학 화합물", description: "핵산의 퓨린 염기" },
    { name: "시토신", formula: "C₄H₅N₃O", category: "생화학 화합물", description: "DNA와 RNA의 피리미딘 염기" },
    { name: "티민", formula: "C₅H₆N₂O₂", category: "생화학 화합물", description: "DNA의 피리미딘 염기" },
    { name: "우라실", formula: "C₄H₄N₂O₂", category: "생화학 화합물", description: "RNA의 피리미딘 염기" },
    { name: "콜레스테롤", formula: "C₂₇H₄₆O", category: "생화학 화합물", description: "세포막의 주요 스테로이드" },
    { name: "테스토스테론", formula: "C₁₉H₂₈O₂", category: "생화학 화합물", description: "남성 호르몬" },
    { name: "에스트라디올", formula: "C₁₈H₂₄O₂", category: "생화학 화합물", description: "여성 호르몬" },
    { name: "프로게스테론", formula: "C₂₁H₃₀O₂", category: "생화학 화합물", description: "임신 유지 호르몬" },
    { name: "코르티솔", formula: "C₂₁H₃₀O₅", category: "생화학 화합물", description: "스트레스 호르몬" },
    { name: "아드레날린", formula: "C₉H₁₃NO₃", category: "생화학 화합물", description: "에피네프린으로 불리는 흥분 호르몬" },
    { name: "노르아드레날린", formula: "C₈H₁₁NO₃", category: "생화학 화합물", description: "노르에피네프린으로 신경전달물질" },
    { name: "도파민", formula: "C₈H₁₁NO₂", category: "생화학 화합물", description: "쾌락과 보상 신경전달물질" },
    { name: "세로토닌", formula: "C₁₀H₁₂N₂O", category: "생화학 화합물", description: "행복 호르몬으로 불리는 신경전달물질" },
    { name: "히스타민", formula: "C₅H₉N₃", category: "생화학 화합물", description: "알레르기 반응 매개 물질" },
    { name: "아세틸콜린", formula: "C₇H₁₆NO₂", category: "생화학 화합물", description: "신경근 접합부의 신경전달물질" },
    { name: "크레아틴", formula: "C₄H₉N₃O₂", category: "생화학 화합물", description: "근육 에너지 대사 물질" },
    { name: "크레아티닌", formula: "C₄H₇N₃O", category: "생화학 화합물", description: "크레아틴의 대사 산물" },
    { name: "요산", formula: "C₅H₄N₄O₃", category: "생화학 화합물", description: "퓨린 대사의 최종 산물" },
    { name: "빌리루빈", formula: "C₃₃H₃₆N₄O₆", category: "생화학 화합물", description: "헴 분해 산물로 황달 원인" },
    { name: "헴", formula: "C₃₄H₃₂FeN₄O₄", category: "생화학 화합물", description: "헤모글로빈의 산소 결합 부위" },
    { name: "ATP", formula: "C₁₀H₁₆N₅O₁₃P₃", category: "생화학 화합물", description: "아데노신삼인산으로 세포의 에너지 화폐" },
    { name: "NAD+", formula: "C₂₁H₂₇N₇O₁₄P₂", category: "생화학 화합물", description: "산화환원 반응의 보조효소" },
    { name: "폴리에틸렌", formula: "(C₂H₄)n", category: "고분자 화합물", description: "가장 널리 사용되는 플라스틱" },
    { name: "폴리프로필렌", formula: "(C₃H₆)n", category: "고분자 화합물", description: "내열성이 우수한 플라스틱" },
    { name: "폴리스티렌", formula: "(C₈H₈)n", category: "고분자 화합물", description: "스티로폼의 주성분" },
    { name: "PVC", formula: "(C₂H₃Cl)n", category: "고분자 화합물", description: "폴리염화비닐로 배관과 바닥재에 사용" },
    { name: "PET", formula: "(C₁₀H₈O₄)n", category: "고분자 화합물", description: "폴리에틸렌테레프탈레이트로 페트병 소재" },
    { name: "나일론 6", formula: "(C₆H₁₁NO)n", category: "고분자 화합물", description: "섬유와 공업용 소재" },
    { name: "나일론 6,6", formula: "(C₁₂H₂₂N₂O₂)n", category: "고분자 화합물", description: "강도가 높은 합성 섬유" },
    { name: "폴리카보네이트", formula: "(C₁₆H₁₄O₃)n", category: "고분자 화합물", description: "투명하고 강한 플라스틱" },
    { name: "폴리우레탄", formula: "(C₃H₆N₂O₂)n", category: "고분자 화합물", description: "스펀지와 단열재 소재" },
    { name: "PMMA", formula: "(C₅H₈O₂)n", category: "고분자 화합물", description: "아크릴로 불리는 투명 플라스틱" },
    { name: "테플론", formula: "(C₂F₄)n", category: "고분자 화합물", description: "폴리테트라플루오로에틸렌으로 논스틱 코팅" },
    { name: "실리콘", formula: "(C₂H₆OSi)n", category: "고분자 화합물", description: "폴리실록산으로 방수 코팅과 의료용 소재" },
    { name: "천연고무", formula: "(C₅H₈)n", category: "고분자 화합물", description: "이소프렌의 중합체" },
    { name: "합성고무", formula: "(C₄H₆)n", category: "고분자 화합물", description: "부타디엔 기반 탄성체" },
    { name: "이부프로펜", formula: "C₁₃H₁₈O₂", category: "약물", description: "비스테로이드성 소염진통제" },
    { name: "나프록센", formula: "C₁₄H₁₄O₃", category: "약물", description: "항염증 진통제" },
    { name: "페니실린", formula: "C₁₆H₁₈N₂O₄S", category: "약물", description: "최초의 항생제" },
    { name: "암피실린", formula: "C₁₆H₁₉N₃O₄S", category: "약물", description: "광범위 항생제" },
    { name: "테트라사이클린", formula: "C₂₂H₂₄N₂O₈", category: "약물", description: "광범위 항생제" },
    { name: "시프로플록사신", formula: "C₁₇H₁₈FN₃O₃", category: "약물", description: "플루오로퀴놀론계 항생제" },
    { name: "아목시실린", formula: "C₁₆H₁₉N₃O₅S", category: "약물", description: "페니실린계 항생제" },
    { name: "메트포르민", formula: "C₄H₁₁N₅", category: "약물", description: "당뇨병 치료제" },
    { name: "인슐린", formula: "C₂₅₇H₃₈₃N₆₅O₇₇S₆", category: "약물", description: "혈당 조절 호르몬" },
    { name: "아토르바스타틴", formula: "C₃₃H₃₅FN₂O₅", category: "약물", description: "콜레스테롤 저하제" },
    { name: "오메프라졸", formula: "C₁₇H₁₉N₃O₃S", category: "약물", description: "위산 억제제" },
    { name: "라니티딘", formula: "C₁₃H₂₂N₄O₃S", category: "약물", description: "H2 차단제 위산 억제제" },
    { name: "로라타딘", formula: "C₂₂H₂₃ClN₂O₂", category: "약물", description: "비진정성 항히스타민제" },
    { name: "세티리진", formula: "C₂₁H₂₅ClN₂O₃", category: "약물", description: "알레르기 치료제" },
    { name: "디펜히드라민", formula: "C₁₇H₂₁NO", category: "약물", description: "진정성 항히스타민제" },
    { name: "프레드니솔론", formula: "C₂₁H₂₈O₅", category: "약물", description: "합성 코르티코스테로이드" },
    { name: "덱사메타손", formula: "C₂₂H₂₉FO₅", category: "약물", description: "강력한 항염증제" },
    { name: "디아제팜", formula: "C₁₆H₁₃ClN₂O", category: "약물", description: "벤조디아제핀계 항불안제" },
    { name: "알프라졸람", formula: "C₁₇H₁₃ClN₄", category: "약물", description: "자낙스로 알려진 항불안제" },
    { name: "플루옥세틴", formula: "C₁₇H₁₈F₃NO", category: "약물", description: "프로작으로 알려진 항우울제" },
    { name: "세르트랄린", formula: "C₁₇H₁₇Cl₂N", category: "약물", description: "졸로프트로 알려진 SSRI 항우울제" },
    { name: "파록세틴", formula: "C₁₉H₂₀FNO₃", category: "약물", description: "SSRI 계열 항우울제" },
    { name: "리튬카보네이트", formula: "Li₂CO₃", category: "약물", description: "양극성 장애 치료제" },
    { name: "발프로산", formula: "C₈H₁₆O₂", category: "약물", description: "항경련제 및 기분 안정제" },
    { name: "카바마제핀", formula: "C₁₅H₁₂N₂O", category: "약물", description: "항경련제" },
    { name: "페니토인", formula: "C₁₅H₁₂N₂O₂", category: "약물", description: "간질 치료제" },
    { name: "DDT", formula: "C₁₄H₉Cl₅", category: "농약", description: "과거 사용된 살충제로 현재 금지" },
    { name: "글리포세이트", formula: "C₃H₈NO₅P", category: "농약", description: "라운드업의 주성분 제초제" },
    { name: "말라티온", formula: "C₁₀H₁₉O₆PS₂", category: "농약", description: "유기인계 살충제" },
    { name: "피레트린", formula: "C₂₁H₂₈O₃", category: "농약", description: "천연 살충제 성분" },
    { name: "이미다클로프리드", formula: "C₉H₁₀ClN₅O₂", category: "농약", description: "네오니코티노이드계 살충제" },
    { name: "TNT", formula: "C₇H₅N₃O₆", category: "산업 화학물", description: "트리니트로톨루엔으로 폭약" },
    { name: "니트로글리세린", formula: "C₃H₅N₃O₉", category: "산업 화학물", description: "다이너마이트의 주성분" },
    { name: "프레온-12", formula: "CCl₂F₂", category: "산업 화학물", description: "CFC 냉매로 오존층 파괴 물질" },
    { name: "다이옥신", formula: "C₁₂H₄Cl₄O₂", category: "산업 화학물", description: "매우 유독한 환경 오염 물질" },
    { name: "PCB", formula: "C₁₂H₁₀₋ₓClₓ", category: "산업 화학물", description: "폴리염화비페닐로 과거 전기 절연체" }
];

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    loadChemicals();
    loadCategories();
    loadTheme();
    // 로드 후, 모든 데이터가 표시되도록 필터링 초기화
    document.getElementById('categoryFilter').value = 'all'; 
    filterByCategory(); 
});

// ===== 초기 데이터 설정 =====
function initializeData() {
    const stored = localStorage.getItem('chemicals');
    if (!stored) {
        // ID 생성 및 추가 정보 삽입
        chemicals = initialChemicals.map((chem, index) => ({
            id: (index + 1).toString(),
            name: chem.name,
            formula: chem.formula,
            category: chem.category,
            description: chem.description,
            source: "https://en.wikipedia.org/", // 기본 소스 추가
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }));
        saveChemicals();
        
        // 카테고리 설정
        initialChemicals.forEach(chem => {
            categories.add(chem.category);
        });
        saveCategories();
        
        console.log("✅ 초기 데이터 로드 완료: " + chemicals.length + "개");
    }
}

// ===== 데이터 로드 =====
function loadChemicals() {
    try {
        const stored = localStorage.getItem('chemicals');
        // loadChemicals는 단순히 데이터만 로드하고, displayChemicals에서 filteredChemicals를 설정
        chemicals = stored ? JSON.parse(stored) : []; 
        // displayChemicals(chemicals); // DOMContentLoaded에서 filterByCategory()를 호출하여 전체 목록을 표시하도록 변경
    } catch (error) {
        console.error("화학물질 로드 오류:", error);
        chemicals = [];
    }
}

function loadCategories() {
    try {
        const stored = localStorage.getItem('categories');
        categories = stored ? new Set(JSON.parse(stored)) : new Set();
        updateCategorySelects();
    } catch (error) {
        console.error("카테고리 로드 오류:", error);
        categories = new Set();
    }
}

// ===== 카테고리 표시 =====
function updateCategorySelects() {
    const categorySelect = document.getElementById('category');
    const categoryFilter = document.getElementById('categoryFilter');
    const categoryGrid = document.getElementById('categoryGrid');

    categorySelect.innerHTML = '<option value="">선택하세요</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    categoryFilter.innerHTML = '<option value="all">전체 카테고리</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    categoryGrid.innerHTML = '';
    categories.forEach(cat => {
        const count = chemicals.filter(c => c.category === cat).length;
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `<div>${cat}</div><div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem;">${count}개 물질</div>`;
        card.onclick = () => {
            document.getElementById('categoryFilter').value = cat;
            filterByCategory();
            scrollToSection('content');
        };
        categoryGrid.appendChild(card);
    });
}

// ===== 화학물질 표시 =====
function displayChemicals(data) {
    filteredChemicals = data;
    currentPage = 1;
    displayPage(currentPage);
}

function displayPage(page) {
    const tableBody = document.getElementById('chemicalTableBody');
    tableBody.innerHTML = '';

    // itemsPerPage를 현재 설정된 값으로 유지
    // let itemsPerPage = 10; // itemsPerPage 전역 변수 사용

    if (filteredChemicals.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #7f8c8d;">등록된 화학물질이 없습니다.</td></tr>';
        createPagination(0);
        return;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredChemicals.slice(startIndex, endIndex);

    pageData.forEach(chemical => {
        const row = document.createElement('tr');
        const desc = chemical.description ? chemical.description.substring(0, 50) + '...' : '-';
        row.innerHTML = `
            <td>${chemical.name || '-'}</td>
            <td>${chemical.formula || '-'}</td>
            <td>${chemical.category || '-'}</td>
            <td>${desc}</td>
            <td>${chemical.source ? `<a href="${chemical.source}" target="_blank">링크</a>` : '-'}</td>
            <td>
                <button class="btn-edit" onclick="editChemical('${chemical.id}')">수정</button>
                <button class="btn-danger" onclick="deleteChemical('${chemical.id}')">삭제</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    createPagination(filteredChemicals.length);
}

function createPagination(totalItems) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return;
    }

    const paginationDiv = document.createElement('div');
    paginationDiv.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    `;

    // 이전 버튼
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn-pagination';
        prevBtn.textContent = '◀ 이전';
        prevBtn.onclick = () => {
            currentPage--;
            displayPage(currentPage);
            scrollToSection('content');
        };
        paginationDiv.appendChild(prevBtn);
    }

    // 페이지 번호
    // 중앙에 현재 페이지를 중심으로 5개 페이지 번호만 표시
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        endPage = Math.min(totalPages, 5);
        startPage = 1;
    } else if (currentPage > totalPages - 2) {
        startPage = Math.max(1, totalPages - 4);
        endPage = totalPages;
    }

    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'btn-pagination';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => { currentPage = 1; displayPage(currentPage); scrollToSection('content'); };
        paginationDiv.appendChild(firstBtn);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 0.5rem';
            paginationDiv.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = currentPage === i ? 'btn-pagination active' : 'btn-pagination';
        pageBtn.textContent = i;
        pageBtn.onclick = () => {
            currentPage = i;
            displayPage(currentPage);
            scrollToSection('content');
        };
        paginationDiv.appendChild(pageBtn);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0 0.5rem';
            paginationDiv.appendChild(ellipsis);
        }
        const lastBtn = document.createElement('button');
        lastBtn.className = 'btn-pagination';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => { currentPage = totalPages; displayPage(currentPage); scrollToSection('content'); };
        paginationDiv.appendChild(lastBtn);
    }

    // 다음 버튼
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn-pagination';
        nextBtn.textContent = '다음 ▶';
        nextBtn.onclick = () => {
            currentPage++;
            displayPage(currentPage);
            scrollToSection('content');
        };
        paginationDiv.appendChild(nextBtn);
    }

    paginationContainer.appendChild(paginationDiv);
}

// ===== 화학물질 추가/저장 =====
document.getElementById('chemicalForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const formula = document.getElementById('formula').value.trim();
    let category = document.getElementById('category').value.trim();
    const newCategory = document.getElementById('newCategory').value.trim();
    const description = document.getElementById('description').value.trim();
    const source = document.getElementById('source').value.trim();

    // 필수 입력값 검증
    if (!name || !formula) {
        alert('이름과 화학식은 필수입니다.');
        return;
    }

    // 카테고리 검증
    if (!newCategory && !category) {
        alert('카테고리를 선택하거나 새 카테고리를 입력하세요.');
        return;
    }

    // 새 카테고리가 있으면 우선 사용
    if (newCategory) {
        category = newCategory;
        if (!categories.has(newCategory)) {
            categories.add(newCategory);
            saveCategories();
            updateCategorySelects();
        }
    }

    const chemicalData = {
        id: currentEditId || Date.now().toString(),
        name,
        formula,
        category,
        description,
        source,
        // 기존 코드 유지: created/updated At 값은 현재 시간을 기준으로 저장
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    try {
        if (currentEditId) {
            // 기존 항목 수정
            const index = chemicals.findIndex(c => c.id === currentEditId);
            if (index > -1) {
                // 기존 데이터의 createdAt을 유지하고, updatedAt만 업데이트
                chemicals[index] = { 
                    ...chemicals[index], 
                    ...chemicalData, 
                    updatedAt: new Date().toISOString(),
                    createdAt: chemicals[index].createdAt // 기존 createdAt 유지
                }; 
                alert("화학물질이 수정되었습니다.");
            }
            currentEditId = null;
        } else {
            // 새 항목 추가
            chemicals.push(chemicalData);
            alert("화학물질이 추가되었습니다.");
        }

        saveChemicals();
        closeAddModal();
        
        // 데이터 로드 및 현재 필터/검색 상태 유지하여 재표시
        loadChemicals();
        filterByCategory(); // 현재 선택된 카테고리/검색 상태 유지
        
        document.getElementById('chemicalForm').reset();
        document.getElementById('newCategory').style.display = 'none';
        updateCategorySelects(); // 카테고리 카드 업데이트
    } catch (error) {
        console.error("저장 오류:", error);
        alert("저장 중 오류가 발생했습니다.");
    }
});

// ===== 저장 함수 =====
function saveChemicals() {
    localStorage.setItem('chemicals', JSON.stringify(chemicals));
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(Array.from(categories)));
}

// ===== 화학물질 수정 =====
function editChemical(id) {
    const chemical = chemicals.find(c => c.id === id);
    if (!chemical) return;

    currentEditId = id;
    document.getElementById('modalTitle').textContent = '화학물질 수정';
    document.getElementById('name').value = chemical.name || '';
    document.getElementById('formula').value = chemical.formula || '';
    document.getElementById('category').value = chemical.category || '';

    // 새 카테고리 입력 필드 숨기기
    document.getElementById('newCategory').value = '';
    document.getElementById('newCategory').style.display = 'none';
    
    document.getElementById('description').value = chemical.description || '';
    document.getElementById('source').value = chemical.source || '';

    openAddModal();
}

// ===== 화학물질 삭제 =====
function deleteChemical(id) {
    if (confirm('정말로 삭제하시겠습니까?')) {
        chemicals = chemicals.filter(c => c.id !== id);
        saveChemicals();
        
        // 카테고리 목록에서 사라진 카테고리 제거 (옵션)
        const newCategories = new Set(chemicals.map(c => c.category));
        categories = newCategories;
        saveCategories();

        // 필터링 상태 유지하며 재표시
        const category = document.getElementById('categoryFilter').value;
        if (category === 'all') {
            displayChemicals(chemicals);
        } else {
            const filtered = chemicals.filter(c => c.category === category);
            displayChemicals(filtered);
        }
        
        updateCategorySelects(); // 카테고리 목록 업데이트 (카테고리 카운트 변경 반영)
        alert("화학물질이 삭제되었습니다.");
    }
}

// ===== 검색 및 필터링 =====
function searchChemicals() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    // 현재 선택된 카테고리에 해당하는 물질만 검색
    let currentChemicals = chemicals;
    if (category !== 'all') {
        currentChemicals = chemicals.filter(c => c.category === category);
    }

    const filtered = currentChemicals.filter(c =>
        (c.name && c.name.toLowerCase().includes(searchTerm)) ||
        (c.formula && c.formula.toLowerCase().includes(searchTerm)) ||
        (c.description && c.description.toLowerCase().includes(searchTerm))
    );
    displayChemicals(filtered);
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let baseChemicals = chemicals;

    // 1. 카테고리 필터링
    if (category !== 'all') {
        baseChemicals = chemicals.filter(c => c.category === category);
    }
    
    // 2. 검색어 필터링 (기존 검색어 유지)
    if (searchTerm) {
        baseChemicals = baseChemicals.filter(c =>
            (c.name && c.name.toLowerCase().includes(searchTerm)) ||
            (c.formula && c.formula.toLowerCase().includes(searchTerm)) ||
            (c.description && c.description.toLowerCase().includes(searchTerm))
        );
    }

    displayChemicals(baseChemicals);
}

// ===== 모달 제어 =====
function openAddModal() {
    document.getElementById('modalTitle').textContent = '화학물질 추가';
    document.getElementById('addModal').style.display = 'block';
    document.getElementById('chemicalForm').reset();
    document.getElementById('newCategory').style.display = 'none';
    currentEditId = null;
    
    // 모달이 열릴 때 카테고리 드롭다운도 업데이트
    updateCategorySelects(); 
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('chemicalForm').reset();
    currentEditId = null;
}

window.onclick = (event) => {
    const addModal = document.getElementById('addModal');
    if (event.target === addModal) {
        closeAddModal();
    }
};

// ===== 새 카테고리 입력 =====
function showNewCategoryInput() {
    const newCategoryInput = document.getElementById('newCategory');
    newCategoryInput.style.display = newCategoryInput.style.display === 'none' || newCategoryInput.style.display === '' ? 'block' : 'none';
}

// ===== 스크롤 네비게이션 =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== 테마 전환 =====
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const icon = document.getElementById('theme-icon');
    icon.textContent = newTheme === 'dark' ? '☀️' : '🌓';
    
    // 로고 변경
    updateLogo(newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.getElementById('theme-icon');
    icon.textContent = savedTheme === 'dark' ? '☀️' : '🌓';
    
    // 로고 변경
    updateLogo(savedTheme);
}

function updateLogo(theme) {
    const logoImage = document.getElementById('logoImage');
    if (logoImage) { // 로고 이미지가 있을 경우에만 처리
        if (theme === 'dark') {
            logoImage.src = 'Dark_Logo.png';
        } else {
            logoImage.src = 'Light_Logo.png';
        }
    }
}

// 전역 함수 노출 (HTML에서 사용할 수 있도록 window 객체에 등록)
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.editChemical = editChemical;
window.deleteChemical = deleteChemical;
window.searchChemicals = searchChemicals;
window.filterByCategory = filterByCategory;
window.showNewCategoryInput = showNewCategoryInput;
window.scrollToSection = scrollToSection;
window.toggleTheme = toggleTheme;
window.updateLogo = updateLogo;

