import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-appliedcamp-detels',
  templateUrl: './appliedcamp-detels.component.html',
  styleUrls: ['./appliedcamp-detels.component.css']
})
export class AppliedcampDetelsComponent implements OnInit, OnChanges {

  @Input('appliedCampData') appliedCampData;
  applieds = [];
  approveds = [];
  rejectds = [];
  constructor() { }
  ngOnInit() {
  }
  ngOnChanges() {
    if(this.appliedCampData) {
    this.applieds = this.appliedCampData.applied;
    this.approveds = this.appliedCampData.approved;
    this.rejectds = this.appliedCampData.rejected;
  }
}

}
