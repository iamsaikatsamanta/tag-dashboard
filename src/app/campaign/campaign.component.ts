import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Service/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaigns = [];
  file: any;
  public modal = 'none';
  perpage = 20;
  page = 1;
  totalPage;
  term = '';
  chakced = [];
  mode;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getallcampaigns(this.page , this.perpage).subscribe(resp => {
      console.log(resp);
      this.campaigns = resp.result.campaigns;
      this.campaigns = this.campaigns.map(ele => {
        return {
          ...ele,
          checked: false
        };
      });
      if (this.isFloat(resp.result.count / this.perpage)) {
        this.totalPage = Math.floor(resp.result.count / this.perpage) + 1;
      } else {
        this.totalPage = Math.floor(resp.result.count / this.perpage);
      }
      this.totalPage = Array(this.totalPage).fill(0).map((x, i) => i);
    });
  }

  ongoingCampaign() {
      this.apiService.getallOngoingCampaign(this.page , this.perpage).subscribe(resp => {
        this.campaigns = resp.result.campaigns;
        this.campaigns = this.campaigns.map(ele => {
          return {
            ...ele,
            checked: false
          };
        });
        if (this.isFloat(resp.result.count / this.perpage)) {
          this.totalPage = Math.floor(resp.result.count / this.perpage) + 1;
        } else {
          this.totalPage = Math.floor(resp.result.count / this.perpage);
        }
        this.totalPage = Array(this.totalPage).fill(0).map((x, i) => i);
      });
  }

  expiredCampaign() {
    this.apiService.getallCompletedCampaign(this.page , this.perpage).subscribe(resp => {
      this.campaigns = resp.result.campaigns;
      this.campaigns = this.campaigns.map(ele => {
        return {
          ...ele,
          checked: false
        };
      });
      if (this.isFloat(resp.result.count / this.perpage)) {
        this.totalPage = Math.floor(resp.result.count / this.perpage) + 1;
      } else {
        this.totalPage = Math.floor(resp.result.count / this.perpage);
      }
      this.totalPage = Array(this.totalPage).fill(0).map((x, i) => i);
    });

  }
  openModal() {
    this.modal = 'block';
    // console.log(this.categories);
  }
  closeModal() {
    this.mode = null;
    this.modal = 'none';
  }
  changePerpage() {
    if (!this.perpage) {
      this.perpage = 1;
    }
    this.apiService.getallbrands(this.page , this.perpage).subscribe(resp => {
      this.campaigns = resp.result.brands;
      if (this.isFloat(resp.result.count / this.perpage)) {
        this.totalPage = Math.floor(resp.result.count / this.perpage) + 1;
      } else {
        this.totalPage = Math.floor(resp.result.count / this.perpage);
      }
      this.totalPage = Array(this.totalPage).fill(0).map((x, i) => i);
    });
  }
  selectPage(page?, incriment? , decrement?) {
    if (page) {
      this.page = page;
    } else if (incriment) {
      if (this.page !== this.totalPage) {
        return;
      }
      this.page += 1;
    } else if (decrement) {
      if (this.page === 1) {
        return;
      }
      this.page -= 1;
    }
    this.changePerpage();
  }
  search() {
    this.apiService.categorySearch(this.page, this.perpage, this.term)
      .subscribe(resp => {
        this.campaigns = resp.result.campaigns;
        if (this.isFloat(resp.result.count / this.perpage)) {
          this.totalPage = Math.floor(resp.result.count / this.perpage) + 1;
        } else {
          this.totalPage = Math.floor(resp.result.count / this.perpage);
        }
        this.totalPage = Array(this.totalPage).fill(0).map((x, i) => i);
      });
  }
  onChecked(id) {
    if (this.chakced.includes(id)) {
      this.chakced = this.chakced.filter(ele => ele !== id);
      this.campaigns.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.campaigns.find(ele => ele._id === id).chakced = true;
    }
  }
  delete() {
    if (this.chakced.length === 0) {
      return;
    }
    this.apiService.deletecampaign({campaign_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
        }
      });
  }
  selectAll() {
    if (this.chakced.length > 0) {
      this.chakced = [];
      this.campaigns.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.campaigns.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  receiveData(event) {
    this.ngOnInit();
    this.closeModal();
  }
  onEdit(index) {
    this.mode = this.campaigns[index];
    this.openModal();
  }
  private isFloat(n) {
    // tslint:disable-next-line:no-bitwise
    return n === +n && n !== ( n | 0);
  }

}
