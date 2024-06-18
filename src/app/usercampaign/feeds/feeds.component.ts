import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnChanges {

  @Input('id') id;
  @Input('campData') campData;
  @Input('link') link;
  feed: any;
  tags = [];
  hastags = [];
  location = false;
  biolink = false;
  constructor(private apiService: ApiService) { }

  ngOnChanges() {
    if (this.id) {
      this.apiService.getFeed(this.id)
        .subscribe(resp => {
          this.feed = resp.result;
          this.tags = this.campData.tags.map(ele => {
            if (resp.result.tags.includes(ele.toLowerCase())) {
              return true;
            } else {
              return false;
            }
          });
          this.hastags = this.campData.hashtag.map(ele => {
            if (resp.result.hashtags.includes(ele.toLowerCase())) {
              return true;
            } else {
              return false;
            }
          });
          // tslint:disable-next-line:max-line-length
          this.location = this.campData.location !== '' || this.campData.location !== null ? this.campData.location.toLowerCase().replace(' ', '-') === resp.result.location : null;
          this.biolink = this.campData.bioLink !== '' || this.campData.bioLink !== null ? this.campData.bioLink === resp.result.linkinbio : null;

        });
    }
  }
  viewPosts() {
    window.open(this.link, 'Posts View' , 'toolbar=0,width=800,height=400');
  }
  sync() {
    this.apiService.syncLinks({feed: [{id: this.id, link: this.link}]})
    .subscribe(resp => {
      if (resp.code === 0) {
        this.ngOnChanges();
      }
    });
  }

}
