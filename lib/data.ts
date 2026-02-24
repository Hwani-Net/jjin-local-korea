// ─── Spot Data ────────────────────────────────────────────────────────────────
export type Category = "food" | "beauty" | "sightseeing" | "accommodation" | "culture";
export type Region = "seoul" | "busan" | "jeju" | "gyeongju" | "gangneung" | "jeonju";

export interface Spot {
  id: string;
  name: { ko: string; en: string; ja: string; zh: string };
  region: Region;
  category: Category;
  koreanRating: number;
  touristRating: number;
  localRating?: number;
  reviewCount: number;
  address: { ko: string; en: string };
  location?: { ko: string; en: string };
  distance?: string;
  tags: string[];
  description: { ko: string; en: string };
  tip: { ko: string; en: string };
  image: string;
  isHiddenGem: boolean;
  price: string;
}

export const spots: Spot[] = [
  {
    id: "gwangjang-bindaetteok",
    name: { ko: "광장시장 빈대떡 골목", en: "Gwangjang Bindaetteok Alley", ja: "広蔵市場チヂミ横丁", zh: "广藏市场绿豆饼胡同" },
    region: "seoul",
    category: "food",
    koreanRating: 4.9,
    touristRating: 4.2,
    reviewCount: 18420,
    address: { ko: "서울 종로구 창경궁로 88", en: "88 Changgyeonggung-ro, Jongno-gu, Seoul" },
    tags: ["#맛집", "#현지인픽", "#전통시장", "#빈대떡"],
    description: { ko: "한국인이 진짜 즐겨 찾는 전통 빈대떡 골목. 관광객 위주 가게들과 달리 현지인 단골들로 넘친다.", en: "The real local bindaetteok (mung bean pancake) alley Koreans love. Unlike tourist-facing stalls, regulars pack this spot." },
    tip: { ko: "오전 10시~낮12시가 줄이 짧음. 막걸리 꼭 같이 주문!", en: "Visit 10am–noon for shorter queues. Must order with makgeolli (rice wine)!" },
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    isHiddenGem: false,
    price: "₩5,000~8,000",
  },
  {
    id: "mangwon-market",
    name: { ko: "망원시장", en: "Mangwon Market", ja: "望遠市場", zh: "望远市场" },
    region: "seoul",
    category: "food",
    koreanRating: 4.8,
    touristRating: 3.9,
    reviewCount: 12350,
    address: { ko: "서울 마포구 포은로 8", en: "8 Poeun-ro, Mapo-gu, Seoul" },
    tags: ["#현지인시장", "#마포맛집", "#떡볶이", "#숨은맛집"],
    description: { ko: "마포 현지인들의 일상 시장. 홍대 근처지만 외국인은 거의 없고 진짜 로컬 식재료와 먹거리가 가득.", en: "The everyday market of Mapo locals. Near Hongdae but packed with real Koreans, not tourists." },
    tip: { ko: "점심시간 직후(1~3시)가 가장 한산. 어묵과 호떡이 필수 체험!", en: "Quietest 1–3pm after lunch rush. Eomuk (fish cake) and hotteok (sweet pancake) are must-tries!" },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    isHiddenGem: true,
    price: "₩2,000~5,000",
  },
  {
    id: "ikseon-dong",
    name: { ko: "익선동 한옥마을", en: "Ikseon-dong Hanok Village", ja: "益善洞韓屋村", zh: "益善洞韩屋村" },
    region: "seoul",
    category: "sightseeing",
    koreanRating: 4.7,
    touristRating: 4.5,
    reviewCount: 9870,
    address: { ko: "서울 종로구 익선동", en: "Ikseon-dong, Jongno-gu, Seoul" },
    tags: ["#한옥", "#인스타", "#카페거리", "#종로"],
    description: { ko: "1920년대 한옥들이 트렌디한 카페와 맛집으로 재탄생. 한국 20~30대가 즐겨 찾는 감성 골목", en: "1920s hanok houses reimagined as trendy cafes and restaurants. Where Korean 20-30s locals come to hang out." },
    tip: { ko: "평일 오후 2~5시가 가장 덜 붐빔. 한복 대여하면 무료 입장 시설도 있음.", en: "Weekday 2–5pm is least crowded. Some spots offer free entry with hanbok rental." },
    image: "https://images.unsplash.com/photo-1531141445733-14c2eb7d4c1f?w=800&q=80",
    isHiddenGem: false,
    price: "무료 입장 / Free entry",
  },
  {
    id: "busan-gukje",
    name: { ko: "부산 국제시장 & 비프광장", en: "Busan Gukje Market & BIFF Square", ja: "釜山国際市場", zh: "釜山国际市场" },
    region: "busan",
    category: "food",
    koreanRating: 4.8,
    touristRating: 4.3,
    reviewCount: 15600,
    address: { ko: "부산 중구 신창동 4가", en: "Sinchang 4-ga, Jung-gu, Busan" },
    tags: ["#부산맛집", "#씨앗호떡", "#비프광장", "#전통시장"],
    description: { ko: "부산 현지인이 꼭 데려가는 국제시장과 비프광장 씨앗호떡. 현지인 평점이 관광객 평점보다 훨씬 높다.", en: "Busan locals' go-to market. The famous seed hotteok here is rated much higher by locals than tourists." },
    tip: { ko: "씨앗호떡은 비프광장 구석 파란 천막 할머니 가게가 원조!", en: "The OG seed hotteok is at the blue tarp grandma's stall in the back of BIFF Square!" },
    image: "https://images.unsplash.com/photo-1567529692333-de9fd6772897?w=800&q=80",
    isHiddenGem: false,
    price: "₩1,000~3,000",
  },
  {
    id: "jeju-haenyeo",
    name: { ko: "제주 해녀촌 활어회", en: "Jeju Haenyeo Village Fresh Sashimi", ja: "済州海女村の活け造り", zh: "济州海女村新鲜刺身" },
    region: "jeju",
    category: "food",
    koreanRating: 4.9,
    touristRating: 4.1,
    reviewCount: 7230,
    address: { ko: "제주 구좌읍 동복리 해녀촌", en: "Haenyeo Village, Dongbok-ri, Gujwa-eup, Jeju" },
    tags: ["#제주해녀", "#활어회", "#로컬픽", "#해산물"],
    description: { ko: "제주 해녀할머니들이 직접 잡은 해산물을 바로 판매. 관광지 식당 절반 가격에 두 배 신선도.", en: "Haenyeo grandmas sell their own catch directly. Half the price of tourist restaurants, twice as fresh." },
    tip: { ko: "오전 8~10시에 가면 갓 잡은 해산물 선택 가능. 현금만 받음!", en: "Go 8–10am to pick from the freshest catch. Cash only!" },
    image: "https://images.unsplash.com/photo-1604177091072-f77da956c14a?w=800&q=80",
    isHiddenGem: true,
    price: "₩15,000~30,000",
  },
  {
    id: "gyeongju-hwangnam-bread",
    name: { ko: "경주 황남빵 본점", en: "Gyeongju Hwangnam Bread (Original)", ja: "慶州ファンナムパン本店", zh: "庆州皇南面包本店" },
    region: "gyeongju",
    category: "food",
    koreanRating: 4.8,
    touristRating: 4.4,
    reviewCount: 22100,
    address: { ko: "경북 경주시 태종로 783", en: "783 Taejong-ro, Gyeongju-si, Gyeongbuk" },
    tags: ["#경주빵", "#황남빵", "#전통과자", "#경주필수"],
    description: { ko: "70년 전통 경주 황남빵 본점. 팥앙금 가득한 이 빵은 경주 여행의 필수 코스.", en: "70-year-old original Gyeongju bread shop. These red bean pastries are a must on any Gyeongju trip." },
    tip: { ko: "갓 구운 빵은 오전 10시, 오후 3시 두 번 나옴. 따뜻할 때 먹는 게 진짜!", en: "Fresh batches come out at 10am and 3pm. Eat them warm for the real experience!" },
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    isHiddenGem: false,
    price: "₩12,000 (10개입)",
  },
  {
    id: "jeonju-hanok",
    name: { ko: "전주 한옥마을 현지인 맛집", en: "Jeonju Hanok Village Local Eateries", ja: "全州韓屋村地元グルメ", zh: "全州韩屋村本地美食" },
    region: "jeonju",
    category: "food",
    koreanRating: 4.7,
    touristRating: 4.0,
    reviewCount: 8900,
    address: { ko: "전북 전주시 완산구 기린대로 99", en: "99 Giringdae-ro, Wansan-gu, Jeonju-si, Jeonbuk" },
    tags: ["#전주비빔밥", "#한옥마을", "#전통음식", "#전주막걸리"],
    description: { ko: "유명 비빔밥 집 말고, 현지인들이 진짜 가는 골목 식당들. 관광지 가격의 절반이면서 더 맛있음.", en: "Skip the famous tourist bibimbap joints. Locals' back-alley restaurants are tastier and half the price." },
    tip: { ko: "한옥마을 뒤쪽 남부시장 청년몰 2층 야시장이 현지인 필수 코스!", en: "The 2nd floor night market at Nambu Market Youth Mall behind the Hanok Village is the locals' must-do!" },
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80",
    isHiddenGem: true,
    price: "₩8,000~12,000",
  },
  {
    id: "gangneung-coffee",
    name: { ko: "강릉 커피 거리", en: "Gangneung Coffee Street", ja: "江陵コーヒー通り", zh: "江陵咖啡街" },
    region: "gangneung",
    category: "sightseeing",
    koreanRating: 4.6,
    touristRating: 4.3,
    reviewCount: 11200,
    address: { ko: "강원 강릉시 경강로 2300", en: "2300 Gyeonggang-ro, Gangneung, Gangwon" },
    tags: ["#강릉커피", "#바다뷰카페", "#강원도여행", "#카페투어"],
    description: { ko: "한국의 커피 수도 강릉. 현지인들이 애정하는 독립 카페들이 바다 뷰를 배경으로 줄지어 있음.", en: "Korea's coffee capital. Beloved indie cafes facing the East Sea, where locals go for weekend café-hopping." },
    tip: { ko: "테라로사 강릉 본점은 오전 9시 오픈. 커피박물관도 함께 방문!", en: "Terarosa flagship opens at 9am. Visit the Coffee Museum too — locals consider it a must!" },
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    isHiddenGem: false,
    price: "₩5,000~8,000",
  },
  {
    id: "suseongmot-cafe",
    name: { ko: "수성못 호수 카페", en: "Suseongmot Lake Cafe", ja: "寿城池湖カフェ", zh: "寿城湖咖啡" },
    region: "seoul",
    category: "sightseeing",
    koreanRating: 4.7,
    touristRating: 3.8,
    reviewCount: 5600,
    address: { ko: "대구 수성구 수성못", en: "Suseongmot, Suseong-gu, Daegu" },
    tags: ["#수성못", "#대구", "#호수카페", "#matcha"],
    description: { ko: "대구 현지인들의 힐링 스팟. 호수 뷰와 말차 디저트가 조화롭다.", en: "A serene escape in Daegu featuring stunning lake views and artisanal matcha desserts." },
    tip: { ko: "저녁 일몰 시간이 가장 아름다움. 오리배 체험도 필수!", en: "Sunset is the most beautiful time. Try the pedal boat ride!" },
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    isHiddenGem: true,
    price: "₩6,000~15,000",
  },
];

// ─── Culture Data ──────────────────────────────────────────────────────────────
export const cultureGuides = [
  {
    id: "dining",
    icon: "🍽️",
    title: { ko: "식사 예절", en: "Dining Etiquette" },
    tips: [
      { ko: "연장자가 먼저 수저를 들기 전에 식사 시작 금지", en: "Wait for the eldest to start eating first" },
      { ko: "밥그릇을 들고 먹는 것은 예의에 어긋남", en: "Don't lift your rice bowl while eating" },
      { ko: "젓가락을 밥에 꽂는 것은 금기 (제사 때만)", en: "Never stick chopsticks upright in rice (funeral ritual only)" },
      { ko: "음식을 남기는 것은 실례가 아님, 과식 강요 안 함", en: "Leaving food is OK, Koreans don't force overeating" },
    ],
  },
  {
    id: "subway",
    icon: "🚇",
    title: { ko: "지하철 매너", en: "Subway Manners" },
    tips: [
      { ko: "노약자석(핑크/파란 좌석)은 절대 앉지 말 것", en: "Never sit in priority seats (pink/blue seats)" },
      { ko: "지하철 안에서 음식 섭취 극히 자제", en: "Avoid eating on the subway" },
      { ko: "통화는 작은 목소리로 짧게, 이어폰 필수", en: "Keep phone calls quiet and brief; always use earphones for media" },
      { ko: "에스컬레이터 오른쪽 서기, 왼쪽은 걷는 사람들을 위해", en: "Stand on the right of escalators, left side for walkers" },
    ],
  },
  {
    id: "drinking",
    icon: "🍺",
    title: { ko: "음주 문화", en: "Drinking Culture" },
    tips: [
      { ko: "자기 잔을 직접 따르지 않음 — 상대에게 따라줌", en: "Never pour your own drink — always pour for others first" },
      { ko: "연장자에게 두 손으로 잔을 받는 것이 예의", en: "Receive and offer drinks with two hands to elders" },
      { ko: "첫 잔은 원샷이 관습 (거절해도 OK)", en: "First glass is traditionally downed in one shot (declining is OK)" },
      { ko: "소주+맥주 섞은 '소맥'이 현지인 정석 음주법", en: "'Somaek' (soju + beer mix) is the classic Korean way to drink" },
    ],
  },
  {
    id: "shopping",
    icon: "🛍️",
    title: { ko: "쇼핑 매너", en: "Shopping Manners" },
    tips: [
      { ko: "물건을 양손으로 주고받는 것이 기본 예의", en: "Use two hands when giving or receiving items" },
      { ko: "재래시장 외 일반 상점은 흥정 불가", en: "Bargaining is not the norm outside traditional markets" },
      { ko: "올리브영은 외국인도 멤버십 가입 가능 (할인 혜택)", en: "Olive Young offers membership to foreigners too (discounts)" },
      { ko: "편의점에서 계산 후 봉투는 유료 (2~5원)", en: "Convenience store bags cost extra (₩2–5)" },
    ],
  },
  {
    id: "meeting",
    icon: "🙏",
    title: { ko: "인사와 만남", en: "Greetings & Meetings" },
    tips: [
      { ko: "가벼운 목례(15도)가 기본 인사", en: "A slight bow (15°) is the standard greeting" },
      { ko: "명함은 두 손으로 받고 잠시 살펴보는 게 예의", en: "Receive business cards with two hands and take a moment to look" },
      { ko: "나이를 묻는 것은 관계 설정 위한 자연스러운 문화", en: "Asking age is natural in Korean culture — it's for social context" },
      { ko: "처음 만났을 때 '반갑습니다' (Bangapseumnida) 한 마디", en: "Say '반갑습니다' (Bangapseumnida) = 'Nice to meet you'" },
    ],
  },
  {
    id: "shoes",
    icon: "👟",
    title: { ko: "신발 문화", en: "Shoe-Free Zones" },
    tips: [
      { ko: "한옥, 한정식 식당, 한국 가정은 신발을 벗고 들어감", en: "Remove shoes in hanok stays, traditional restaurants, and homes" },
      { ko: "슬리퍼가 현관에 있으면 신발 벗는 곳이라는 신호", en: "Slippers at the entrance = shoes-off zone" },
      { ko: "일부 찜질방(사우나)은 입장 후 신발 보관함 제공", en: "Jjimjilbangs (Korean saunas) have shoe lockers at the entrance" },
      { ko: "실내 화장실용 슬리퍼 따로 있는 경우 많음", en: "Many traditional places have separate bathroom slippers" },
    ],
  },
];

// ─── Korean Phrases ────────────────────────────────────────────────────────────
export const phrases = [
  { korean: "안녕하세요", romanized: "Annyeonghaseyo", meaning: "Hello", emoji: "👋" },
  { korean: "감사합니다", romanized: "Gamsahamnida", meaning: "Thank you", emoji: "🙏" },
  { korean: "얼마예요?", romanized: "Eolmayeyo?", meaning: "How much is it?", emoji: "💰" },
  { korean: "맛있어요!", romanized: "Massisseoyo!", meaning: "It's delicious!", emoji: "😋" },
  { korean: "화장실 어디예요?", romanized: "Hwajangsil eodiyeyo?", meaning: "Where is the restroom?", emoji: "🚻" },
  { korean: "하나 더 주세요", romanized: "Hana deo juseyo", meaning: "One more please", emoji: "☝️" },
];

// ─── K-Beauty Data ─────────────────────────────────────────────────────────────
export const beautyGuides = [
  {
    id: "olive-young",
    name: { ko: "올리브영 추천 루트", en: "Olive Young Route" },
    description: { ko: "한국인이 즐겨 사는 품목 TOP 10 + 지역별 올리브영 추천 지점", en: "Korean locals' top 10 picks + best Olive Young branches by area" },
    items: ["토너패드", "선크림 SPF50+", "클렌징오일", "앰플/세럼", "마스크팩"],
    englishItems: ["Toner Pads", "Sunscreen SPF50+", "Cleansing Oil", "Ampoule/Serum", "Sheet Masks"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
  },
  {
    id: "skin-type",
    name: { ko: "피부 타입별 K-뷰티 루트", en: "K-Beauty by Skin Type" },
    description: { ko: "건성/지성/복합성 피부를 위한 한국인 추천 브랜드와 제품 조합", en: "Korean-recommended brand combos for dry, oily, and combination skin" },
    items: ["이니스프리", "라네즈", "닥터자르트", "코스알엑스", "아누아"],
    englishItems: ["Innisfree", "Laneige", "Dr. Jart+", "COSRX", "ANUA"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  },
];

// ─── Regions ───────────────────────────────────────────────────────────────────
export const regions: {
  id: Region;
  name: string;
  nameKo: string;
  label: { ko: string; en: string; ja: string; zh: string };
  emoji: string;
  desc: { ko: string; en: string };
  tagline?: string;
  image?: string;
}[] = [
  {
    id: "seoul", name: "Seoul", nameKo: "서울",
    label: { ko: "서울", en: "Seoul", ja: "ソウル", zh: "首尔" },
    emoji: "🏙️",
    desc: { ko: "한국의 심장, 모든 것이 있는 도시", en: "Korea's capital — everything in one city" },
    tagline: "Korea's Capital",
    image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=400&q=70",
  },
  {
    id: "busan", name: "Busan", nameKo: "부산",
    label: { ko: "부산", en: "Busan", ja: "釜山", zh: "釜山" },
    emoji: "🌊",
    desc: { ko: "바다와 산이 공존하는 매력적인 항구도시", en: "A stunning port city where mountains meet the sea" },
    tagline: "Coastal Vibes",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=70",
  },
  {
    id: "jeju", name: "Jeju", nameKo: "제주",
    label: { ko: "제주", en: "Jeju", ja: "済州", zh: "济州" },
    emoji: "🌺",
    desc: { ko: "한국의 하와이, 자연과 해산물의 보고", en: "Korea's Hawaii — volcanic nature and fresh seafood" },
    tagline: "Island Paradise",
    image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=400&q=70",
  },
  {
    id: "gyeongju", name: "Gyeongju", nameKo: "경주",
    label: { ko: "경주", en: "Gyeongju", ja: "慶州", zh: "庆州" },
    emoji: "🛕",
    desc: { ko: "천년 신라의 역사가 살아있는 야외박물관", en: "An open-air museum of 1,000-year Silla dynasty history" },
    tagline: "Ancient History",
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=400&q=70",
  },
  {
    id: "gangneung", name: "Gangneung", nameKo: "강릉",
    label: { ko: "강릉", en: "Gangneung", ja: "江陵", zh: "江陵" },
    emoji: "☕",
    desc: { ko: "한국 커피의 수도, 동해 바다 뷰 카페들", en: "Korea's coffee capital with East Sea café views" },
    tagline: "Coffee & Sea",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70",
  },
  {
    id: "jeonju", name: "Jeonju", nameKo: "전주",
    label: { ko: "전주", en: "Jeonju", ja: "全州", zh: "全州" },
    emoji: "🍱",
    desc: { ko: "한국 음식 문화의 정수, 비빔밥 원조 도시", en: "The cradle of Korean cuisine and original bibimbap city" },
    tagline: "Food Paradise",
    image: "https://images.unsplash.com/photo-1583531172078-5ca7f4aca819?w=400&q=70",
  },
];
