
export class Attraction {
    constructor(
        public name,
        public distict,
        public address,
        public lat,
        public lng,
        public houseHolds,
        public persons,
        public floors,
        public progress,
        public isSelected = false
    ) {}

    unselected() {
        this.isSelected = false;
    }
}
