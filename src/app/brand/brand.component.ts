import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Service/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands = [];
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
    this.apiService.getallbrands(this.page , this.perpage).subscribe(resp => {
      console.log(resp);
      this.brands = resp.result.brands;
      this.brands = this.brands.map(ele => {
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
      this.brands = resp.result.brands;
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
        this.brands = resp.result.brands;
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
      this.brands.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.brands.find(ele => ele._id === id).chakced = true;
    }
  }
  delete() {
    if (this.chakced.length === 0) {
      return;
    }
    this.apiService.deleteBrand({brand_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
        }
      });
  }
  selectAll() {
    if (this.chakced.length > 0) {
      this.chakced = [];
      this.brands.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.brands.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  receiveData(event) {
    if (this.mode) {
      const index = this.brands.findIndex(ele => ele._id === event._id);
      this.brands[index] = event;
    } else {
      this.brands.push(event);
    }
    this.ngOnInit();
    this.closeModal();
  }
  onEdit(index) {
    this.mode = this.brands[index];
    this.openModal();
  }
  onViewCover(index) {
    window.open(this.brands[index].coverphoto, 'Image View' , 'toolbar=0,width=800,height=400');
  }
  onViewInsta(index) {
    window.open(this.brands[index].instagram_link, 'Instagram View' , 'toolbar=0,width=800,height=400');
  }
  onViewFb(index) {
    window.open(this.brands[index].facebook_link, 'Facebook View' , 'toolbar=0,width=800,height=400');
  }
  onViewYoutube(index) {
    window.open(this.brands[index].youtube_link, 'Youtube View' , 'toolbar=0,width=800,height=400');
  }
  onViewTwitter(index) {
    window.open(this.brands[index].tweeter_link, 'Twitter View' , 'toolbar=0,width=800,height=400');
  }
  private isFloat(n) {
    // tslint:disable-next-line:no-bitwise
    return n === +n && n !== ( n | 0);
  }
}


