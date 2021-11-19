import { Component, Input, OnInit } from '@angular/core';
import { Attraction } from 'src/app/attractions/model/attraction.class';
import { Pagination } from '../../model/pagination.class';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  pagination = new Pagination();

  constructor() { }

  ngOnInit(): void {
  }

  changePage(action: string, page: number = null) {
    this.pagination.alterPage(action, page);

  }


}
