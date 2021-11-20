
export const AppConstant = {
  DEFAULT_LANG: 'zh-tw',
  CORS_ANYWHERE: 'https://mysterious-mesa-58655.herokuapp.com/',
  ALL_DISTICT: '全區',
  ATTRACTION: '臺北市社會住宅興建進度',
  FAVORITES: '我的最愛清單',
  FETCH: '取得API Data',
};


export enum RegexPattern {
  POSITIVE_5_INTEGER_ONLY= '^[0-9]{0,5}$'
}

export enum AttractionText {
  NAME = '社會住宅名稱',
  DISTICT = '區域',
  ADDRESS = '地址',
  LAT = '緯度',
  LNG = '經度',
  HOUSEHOLDS = '規劃戶數',
  PERSONS = '居住人口',
  FLOORS = '樓層數',
  PROGRESS = '興建進度',
}

export enum ErrorMessage {
  CORS_ERROR = '請重新取得Data!',
  POSITIVE_5_INTEGER_ONLY= '請輸入五位數正整數'
}