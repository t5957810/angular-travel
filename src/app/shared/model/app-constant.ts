
export enum Common {
  CORS_ANYWHERE= 'https://mysterious-mesa-58655.herokuapp.com/',
  ALL_DISTICT= '全區',
  ATTRACTION= '臺北市社會住宅興建進度',
  FAVORITES= '我的最愛清單',
  ADD_TO_FAVORITES= '加到我的最愛',
  FETCH= '取得API Data',
  EDIT= '編輯',
  SAVE= '儲存',
  PLEASE_ENTER= '請輸入',
  CLEAR_LOCAL_STORAGE= '清除本地端資料',
  REMOVE_FROM_FAVORITES= '從我的最愛中移除',
  NO_LOCAL_STORAGE_DATA= '本地端尚未有儲存之資料。',
  NO_DATA= '沒有資料。'
}

export enum PaginationText {
  PREVIOUS= '上一頁',
  NEXT= '下一頁'
}

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