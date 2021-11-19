export class Attraction {
    constructor(
        public address,
        public distict,
        public floors,
        public houseHolds,
        public lat,
        public lng,
        public name,
        public persons,
        public progress,
        public isSelected = false
    ) {
    }
}
