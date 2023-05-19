type GoalList = string[][];

interface GoalLists {
  [key: string]: GoalList;
}

export const GOAL_LISTS: GoalLists = {
  ko: [
    [
      '훌륭한 프론트엔드 개발자 되기',
      '월 1000의 광고 수익을 내는 블로거 되기',
      '자녀를 올바르게 자라게 하기',
      '세계 여행을 떠나기',
      'Auto GPT를 이용해 프로젝트 만들기',
      '젤다 왕국의 눈물 재미있게 즐기기',
      '나이 90에 자녀들이 매주 전화오게 하기',
      '20살에 독립하여 집 나가기',
    ],
    [
      '알고리즘 눈 감고도 풀 수 있게 되기',
      '득점왕으로 epl에서 우승하기',
      '새학기 친구들과 사이좋게 지내기',
      '브론즈 티어에서 탈출하기',
      '흔들리지 않고 주식 간직하기',
      '수능 만점자 되기',
      '훌륭한 백엔드 개발자 되기',
      '1000만 팔로워의 틱토커 되기',
    ],
    [
      '나이 80까지 건강하게 살기',
      '창업을 성공적으로 하기',
      '빠르게 다이어트 성공하기',
      '깃허브 스타 1000개 받기',
      '군대에서 선임 눈 피해 잘 살아남기',
      '이쁜 여자친구 사귀기',
      '자율 프로젝트 발표 잘하기',
      '사황을 무찌르고 해적왕 되기',
    ],
    [
      '4개 국어 자유롭게 구사하기',
      '베스트 셀러 작가 되기',
      'SSAFY 경험치 1등하기',
      '자동완성 없이 코딩하기',
      '세상을 감동시킬 노래 만들기',
      '저녁 메뉴 매일 다양하게 먹기',
      '대자연에서 한 달 동안 살아남기',
      '태평양 한 바퀴 맨몸 수영',
    ],
  ],
  en: [
    [
      'Become a great frontend developer',
      'Become a blogger who earns $1000 a month',
      'Raise your children properly',
      'Go on a trip around the world',
      'Create a project using Auto GPT',
      'Enjoy The Legend of Zelda: Breath of the Wild',
      'Make your children call you every week when you are 90 years old',
      'Leave home independently at the age of 20',
    ],
    [
      'Be able to solve algorithms with your eyes closed',
      'Win the Premier League as the top scorer',
      'Get along well with your friends in the new semester',
      'Escape from Bronze Tier',
      'Hold stocks without shaking',
      'Get a perfect score on the SAT',
      'Become a great backend developer',
      'Become a TikToker with 10 million followers',
    ],
    [
      'Live healthily until you are 80 years old',
      'Successfully start a business',
      'Lose weight quickly',
      'Get 1000 stars on GitHub',
      'Survive well in the military',
      'Get a pretty girlfriend',
      'Give a good presentation on your self-directed project',
      'Defeat the four emperors and become the pirate king',
    ],
    [
      'Speak four languages freely',
      'Become a best-selling author',
      'Get the most SSAFY experience points',
      'Code without auto-completion',
      'Create a song that will impress the world',
      'Eat a variety of dinner menus every day',
      'Survive in the wilderness for a month',
      'Swim around the Pacific Ocean',
    ],
  ],
};
