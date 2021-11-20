import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Attraction } from 'src/app/attractions/model/attraction.class';
import { AttractionText, ErrorMessage, RegexPattern } from '../../model/app-constant';

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
  attractionText = AttractionText;
  errorMessageText = ErrorMessage;

  constructor() { }

  ngOnInit(): void {
    this.initForm(this.formData);
    console.log(this.form);
  }


  private initForm(data: Attraction) {
    if(!data) {
      return;
    }
    this.form = new FormGroup({
      'name': new FormControl(data.name, [Validators.required]),
      'distict': new FormControl(data.distict, [Validators.required]),
      'houseHolds': new FormControl(data.houseHolds, [Validators.pattern(RegexPattern.POSITIVE_5_INTEGER_ONLY)]),
      'persons': new FormControl(data.persons, [Validators.pattern(RegexPattern.POSITIVE_5_INTEGER_ONLY)]),
      'floors': new FormControl(data.floors),
      'progress': new FormControl(data.progress, [Validators.required]),
    });
  }

  onClose() {
    this.close$.next(null);
  }

  onSave() {   
    if(!this.form.valid) {
      return;
    }
    this.close$.next(this.form.value);
  }

}
