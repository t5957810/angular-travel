import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  changed$ = new Subject<string>();
  isExist = false;

  constructor() { }

  onOpen() {
    console.log('open!')
    if(this.isExist) {
      this.onClose();
    }

    this.isExist = true;
    this.changed$.next('show');
  }

  onClose() {
    this.isExist = false;
    console.log('close!')
    this.changed$.next(null);
  }

  onSave() {
    this.isExist = false;
    console.log('save!')
    this.changed$.next('save');
  }

}
