export class Pagination {
    private _totalPage: number = 0;    // 總共有幾頁
    private _pageList: number[] = [];  // 分頁總頁數陣列
    private _eachPage: number = 5;     // 每一頁顯示的筆數
    private _pageStart: number = 1;    // 起始頁
    private _itemEnd: number = 0;
    private _itemStart: number = 0;

    get pageStart() {
        return this._pageStart;
    }

    get pageList() {
        return this._pageList;
    }

    get itemEnd() {
        this._itemEnd = this._eachPage * this._pageStart;
        return this._itemEnd;
    }

    get itemStart() {
        this._itemStart = (this._itemEnd - this._eachPage) <= 0 ? 0 : this._itemEnd - this._eachPage;
        return this._itemStart;
    }

    buildPageList(list: any[]) {
        this._pageList = [];
        this._totalPage = Math.ceil((list.length / this._eachPage));
        for (let i = 1; i <= this._totalPage; i++) {
            this._pageList.push(i);
        }
    }

    resetPageStart() {
        this._pageStart = 1;
    }

    alterPage(action: string, page: number) {
        if (action === 'previous') {
            if (this._pageStart === 1) {
                return;
            }
            this._pageStart--;
        }
        if (action === 'next') {
            if (this._pageStart === this._totalPage) {
                return;
            }
            this._pageStart++;
        }
        if (action === 'change') {
            this._pageStart = page;
        }
    }


    constructor() {
    }
}
