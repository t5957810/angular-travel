import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.onFetch();
  }

  onFetch() {
    this.dataStorageService.fetchAttractions().subscribe();
  }

  ngOnDestroy() {
   
  }

}
