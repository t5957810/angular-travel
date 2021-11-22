import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Attraction } from 'src/app/attractions/model/attraction.class';
import * as AppConstant from '../../model/app-constant';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() errorMessage: string;
  @Input() formData: any;
  close$ = new Subject<any>();

  form: FormGroup;
  appConstant = AppConstant;

  constructor() { }

  ngOnInit(): void {
    this.initForm(this.formData);
  }


  private initForm(data: Attraction) {
    if (!data) {
      return;
    }
    this.form = new FormGroup({
      'name': new FormControl(data.name, [Validators.required]),
      'distict': new FormControl(data.distict, [Validators.required]),
      'houseHolds': new FormControl(data.houseHolds, [Validators.pattern(this.appConstant.RegexPattern.POSITIVE_5_INTEGER_ONLY)]),
      'persons': new FormControl(data.persons, [Validators.pattern(this.appConstant.RegexPattern.POSITIVE_5_INTEGER_ONLY)]),
      'floors': new FormControl(data.floors),
      'progress': new FormControl(data.progress, [Validators.required]),
    });
  }

  onClose() {
    this.close$.next(null);
  }

  onSave() {
    this.trimForm();
    if (!this.form.valid) {
      return;
    }
    this.close$.next(this.form.value);
  }

  private trimForm() {
    Object.keys(this.form.controls).forEach((key) => {
      if (this.form.get(key).value) {
        this.form.get(key).patchValue(this.form.get(key).value.trim())
      }
    });
  }

}
