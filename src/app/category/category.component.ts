import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any;
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
    this.apiService.getcategorylist(1 , this.perpage).subscribe(resp => {
      this.categories = resp.result.category;
      this.categories = this.categories.map(ele => {
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
    this.apiService.getcategorylist(this.page , this.perpage).subscribe(resp => {
      this.categories = resp.result.category;
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
        this.categories = resp.result.category;
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
      this.categories.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.categories.find(ele => ele._id === id).chakced = true;
    }
  }
  delete() {
    if (this.chakced.length === 0) {
      return;
    }
    this.apiService.deletecategory({category_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
        }
      });
  }
  selectAll() {
    if (this.chakced.length > 0) {
      this.chakced = [];
      this.categories.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.categories.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  receiveData(event) {
    if (this.mode) {
      const index = this.categories.findIndex(ele => ele._id === event._id);
      this.categories[index] = event;
    } else {
      this.categories.push(event);
    }
    this.mode = null;
    this.closeModal();
  }
  onEdit(index) {
    this.mode = this.categories[index];
    this.openModal();
  }

  sort() {
    this.categories.sort();
  }
   private isFloat(n) {
     // tslint:disable-next-line:no-bitwise
    return n === +n && n !== ( n | 0);
  }
}
