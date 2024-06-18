import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-add-new-brand',
  templateUrl: './add-new-brand.component.html',
  styleUrls: ['./add-new-brand.component.css']
})
export class AddNewBrandComponent implements OnInit, OnChanges {
  brandForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    subcategory: new FormControl(null, Validators.required),
    logo: new FormControl(null, Validators.required),
    coverphoto: new FormControl(null, Validators.required)
  });
  categories = [];
  subcategories = [];
  @Input('mode') mode;
  @Input('modal') modal;
  @Output() data = new EventEmitter<any>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getcategorylist(null , null)
      .subscribe(resp => {
        this.categories = resp.result.category;
      });
  }

  ngOnChanges() {
    if (this.mode) {
      this.onSelectCategory(this.mode.category._id);
      this.brandForm.patchValue({
        name: this.mode.name,
        category: this.mode.category._id,
        subcategory: this.mode.subcategory._id,
        logo: this.mode.logo,
        coverphoto: this.mode.coverphoto
      });
    }
    if (this.modal === 'none') {
      this.brandForm.reset();
    }
  }
  onSubmit() {
    if (this.brandForm.invalid) {
      return;
    }
    if (this.mode) {
      this.apiService.updatebrand(this.brandForm.getRawValue(), this.mode._id)
        .subscribe(resp => {
          this.data.emit(resp.result);
        });
    } else {
      this.apiService.createbrand(this.brandForm.getRawValue()).subscribe(resp => {
        this.data.emit(resp.result);
      });
    }
  }
  onSelectCategory(id) {
    this.apiService.getAllSubCategoryByCategoryId(id)
      .subscribe(resp => {
        this.subcategories = resp.result;
      });
  }
  onImagePicked(event: Event, type) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const data = new FormData();
      data.append('image', file , file.name);
      this.apiService.fileUpload(data)
        .subscribe(resp => {
          if (resp.code === 0) {
            if (type === 'logo') {
              this.brandForm.patchValue({
                logo: resp.result
              });
            } else if (type === 'coverphoto') {
              this.brandForm.patchValue({
                coverphoto: resp.result
              });
            }
          }
        });
    }
  }
}
