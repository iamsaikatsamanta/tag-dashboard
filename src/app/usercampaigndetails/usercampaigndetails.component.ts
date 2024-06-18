import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-usercampaigndetails',
  templateUrl: './usercampaigndetails.component.html',
  styleUrls: ['./usercampaigndetails.component.css']
})
export class UsercampaigndetailsComponent implements OnInit, OnChanges {

  @Input('mode') mode;
  @Input('modal') modal;
  constructor() { }

  ngOnInit() {}
  ngOnChanges() {
  }

}
