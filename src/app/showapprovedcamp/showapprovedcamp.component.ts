import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ApiService } from '../Service/api.service';
import {Angular5Csv} from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-showapprovedcamp',
  templateUrl: './showapprovedcamp.component.html',
  styleUrls: ['./showapprovedcamp.component.css']
})
export class ShowapprovedcampComponent implements OnInit {

  _id = null;
  userCamp = [];
  total: any;
  brandname = '';
  campaignname = '';
  feed;
  changedcampcsv = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.apiService.getApprovedCampaign(this._id)
    .subscribe(async resp => {
      this.userCamp = resp.result;
      this.feed = this.userCamp.map(ele => {
        return {
          id: ele.feed ? ele.feed._id : null,
          link: ele.postLink[0]
        };
      });
      console.log(resp);
    });
    this.apiService.getcampaignbyId(this._id).subscribe( res => {
      this.campaignname = res.result.name;
      this.brandname = res.result.brand.name;
    });
  }
  sync() {
    this.apiService.syncLinks({feed: this.feed})
    .subscribe(resp => {
      if (resp.code === 0) {
        this.ngOnInit();
      }
    });
  }
  async exportToCsv() {
    this.changedcampcsv = await this.userCamp.map(ele => {
      return {
        name: ele.user.name,
        email: ele.user.email,
        instagram_id: ele.user.instagram_id ? ele.user.instagram_id : '-',
        phoneNo: ele.user.phoneNo,
        applicationDate: ele.updatedAt,
        birthday: ele.user.birthday ? ele.user.birthday : '-',
        gender: ele.user.gender ? ele.user.gender : '-',
        paytmNo: ele.user.paytmNo ? ele.user.paytmNo : '-',
        payout: ele.paymentAmount ? ele.paymentAmount : '-',
        link: ele.postLink[0],
        likes: ele.feed && ele.feed.likes ? ele.feed.likes : '',
        comments: ele.feed &&  ele.feed.comments ? ele.feed.comments : '',
        views: ele.feed && ele.feed.views ? ele.feed.views : ''

      };
    });
    const options = {
      showLabels: true,
      useBom: true,
      nullToEmptyString: false,
      headers: ['Name', 'Email', 'Phone No', 'Instagram Id', 'Application Date', 'Date of Birth', 'Gender', 'Paytm No', 'Payout', 'Link', 'Likes', 'Comments', 'Views']
    };
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(this.changedcampcsv, this.brandname, options);

  }

}
