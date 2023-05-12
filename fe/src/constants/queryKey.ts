// 도메인 주소
const BASE_URL = 'https://www.shinemustget.com/api';

// 유저 정보 조회
export const MEMBER_INFO = `${BASE_URL}/memberInfo`;
// 카카오 로그아웃
export const KAKAO_LOGOUT = `${BASE_URL}/kakaoLogout`;

// 만다라드 타이틀 생성
export const MANDALART_BIG_GOAL = `${BASE_URL}/mandalart/big-goal`;
// 만다라트 세부 목표 생성
export const MANDALART_SMALL_GOAL = `${BASE_URL}/mandalart/small-goal`;
// 만다라트 생성
export const MANDALART_CREATE = `${BASE_URL}/mandalart/create`;
// 만다라트 조회
export const MANDALART_READ_MAIN = `${BASE_URL}/mandalart/readMain`;
// 만다라트 좋아요
export const MANDALART_LIKE = `${BASE_URL}/mandalart/like`;
// 만다라트 검색
export const MANDALART_SEARCH = `${BASE_URL}/mandalart/search/`;
// 만다라트 상세조회
export const MANDALART_SEARCH_DETAIL = `${BASE_URL}/mandalart/searchDetail`;
// 현재 목표 조회
export const MANDALART_READ_NOW_GOAL = `${BASE_URL}/profile/readNowGoal`;
// 달성 목표 조회
export const MANDALART_READ_CLEAR_GOAL = `${BASE_URL}/profile/readClearGoal`;
// 완료된 만다라트 조회
export const MANDALART_READ_CLEAR_MANDALART = `${BASE_URL}/profile/readClearMandalart`;
// 만다라트 삭제
export const MANDALART_DELETE = `${BASE_URL}/profile/delete`;
// 세부 목표 달성 완료
export const MANDALART_CLEAR = `${BASE_URL}/mandalart/clear`;

// 포도알 설정
export const PODO_CREATE = `${BASE_URL}/podo/setting/`;
// 포도알 작성
export const PODO_WRITE = `${BASE_URL}/podo/write`;
// 포도송이 조회
export const PODO_READ_PODO = `${BASE_URL}/podo/readPodo/`;
// 회원 포도알 스티커 조회
export const PODO_MY_STICKER = `${BASE_URL}/podo/mySticker`;
// 포도알 조회
export const PODO_DETAIL = `${BASE_URL}/podo/detail/`;

// staleTime 5분
export const staleTime = 1000 * 60 * 5;

// cacheTime 10분
export const cacheTime = 1000 * 60 * 10;
