import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-qanda',
  templateUrl: './qanda.component.html',
  styleUrls: ['./qanda.component.css']
})
export class QandaComponent implements OnInit, OnChanges {
  @Input() items;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    console.log(this.items);
  }

}
