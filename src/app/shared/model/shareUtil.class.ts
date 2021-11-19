import { Attraction } from "src/app/attractions/model/attraction.class";

export class ShareUtil {

  // 取消勾選
  static unselectedAttractions(attractions: Attraction[]) {
    return attractions.map(
      (item: Attraction) => {
        return { ...item, isSelected: false };
      }
    );
  }
}
