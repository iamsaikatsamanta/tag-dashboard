import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Service/api.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  subCategory = [];
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
    this.apiService.getsubcategorylist(1 , this.perpage).subscribe(resp => {
      console.log(resp);
      this.subCategory = resp.result.subCategory;
      this.subCategory = this.subCategory.map(ele => {
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
    this.apiService.getsubcategorylist(this.page , this.perpage).subscribe(resp => {
      this.subCategory = resp.result.subCategory;
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
        this.subCategory = resp.result.subCategory;
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
      this.subCategory.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.subCategory.find(ele => ele._id === id).chakced = true;
    }
  }
  delete() {
    if (this.chakced.length === 0) {
      return;
    }
    this.apiService.deletesubcategory({subcategory_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
        }
      });
  }
  selectAll() {
    if (this.chakced.length > 0) {
      this.chakced = [];
      this.subCategory.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.subCategory.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  receiveData(event) {
    if (this.mode) {
      const index = this.subCategory.findIndex(ele => ele._id === event._id);
      this.subCategory[index] = event;
    } else {
      this.subCategory.push(event);
    }
    this.ngOnInit();
    this.closeModal();
  }
  onEdit(index) {
    this.mode = this.subCategory[index];
    this.openModal();
  }

  sort() {
    this.subCategory.sort();
  }
  private isFloat(n) {
    // tslint:disable-next-line:no-bitwise
    return n === +n && n !== ( n | 0);
  }
}


