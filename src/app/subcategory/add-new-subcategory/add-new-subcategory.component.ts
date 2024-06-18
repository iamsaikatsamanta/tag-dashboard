import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-add-new-subcategory',
  templateUrl: './add-new-subcategory.component.html',
  styleUrls: ['./add-new-subcategory.component.css']
})
export class AddNewSubcategoryComponent implements OnInit, OnChanges {
  subcategoryForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    mainCatagoty: new FormControl(null, Validators.required)
  });
  @Input('mode') mode;
  @Input('modal') modal;
  @Output() data = new EventEmitter<any>();
  categories = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getcategorylist(null, null)
      .subscribe(resp => {
        this.categories = resp.result.category;
      });
  }

  ngOnChanges() {
    if (this.mode) {
      this.subcategoryForm.patchValue({
        name: this.mode.name,
        mainCatagoty: this.mode.mainCatagoty._id
      });
    }
    if (this.modal === 'none') {
      this.subcategoryForm.reset();
    }
  }
  onSubmit() {
    if (this.subcategoryForm.invalid) {
      return;
    }
    if (this.mode) {
      this.apiService.updatesubcategory(this.subcategoryForm.getRawValue(), this.mode._id)
        .subscribe(resp => {
          this.data.emit(resp.result);
        });
    } else {
      this.apiService.createsubcategory(this.subcategoryForm.getRawValue()).subscribe(resp => {
        this.data.emit(resp.result);
      });
    }
  }
}

