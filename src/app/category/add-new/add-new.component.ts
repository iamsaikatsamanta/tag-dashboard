import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from '../../Service/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit, OnChanges {
  categoryForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    imgUrl: new FormControl(null, Validators.required)
  });
  @Input('mode') mode;
  @Input('modal') modal;
  @Output() data = new EventEmitter<any>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.mode) {
      this.categoryForm.patchValue({
        name: this.mode.name,
        imgUrl: this.mode.imgUrl
      });
    }
    if (this.modal === 'none') {
      this.categoryForm.reset();
    }
  }
  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.mode) {
      this.apiService.updateCategory(this.categoryForm.getRawValue(), this.mode._id)
        .subscribe(resp => {
          this.data.emit(resp.result);
        });
    } else {
      this.apiService.createcategory(this.categoryForm.getRawValue()).subscribe(resp => {
        this.data.emit(resp.result);
      });
    }
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const data = new FormData();
      data.append('image', file , file.name);
      this.apiService.fileUpload(data)
        .subscribe(resp => {
          if (resp.code === 0) {
            this.categoryForm.patchValue({
              imgUrl: resp.result
            });
          }
        });
    }
  }
}
