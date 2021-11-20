import { Attraction } from "src/app/attractions/model/attraction.class";

export class ShareUtil {

  // 取消勾選
  static unselectedAttractions(attractions: Attraction[]) {
    for(const each of attractions) {
      each.unselected();
    }
    return attractions;
  }
}
