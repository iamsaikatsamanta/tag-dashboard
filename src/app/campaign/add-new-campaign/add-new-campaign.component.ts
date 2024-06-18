import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../Service/api.service';

@Component({
  selector: 'app-add-new-campaign',
  templateUrl: './add-new-campaign.component.html',
  styleUrls: ['./add-new-campaign.component.css']
})
export class AddNewCampaignComponent implements OnInit, OnChanges {
  campForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    subcategory: new FormControl(null, Validators.required),
    submitioncount: new FormControl(null, Validators.required),
    webViewUrl: new FormControl(null, Validators.required),
    bioLink: new FormControl(null, Validators.required),
    brand: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    startedfrom: new FormControl(null, Validators.required),
    expireson: new FormControl(null, Validators.required),
    imgUrl: new FormControl(null, Validators.required),
    maxparticipant: new FormControl(null, Validators.required),
    maxearning: new FormControl(null, Validators.required),
    applicationClosed: new FormControl(false, Validators.required)
});
  categories = [];
  subcategories = [];
  brands = [];
  otherlink = [{title: '', link: '', isOpenable: false}];
  requirements = [{value: ''}];
  todonext = [{value: ''}];
  questions = [{value: ''}];
  tags = [{value: ''}];
  hashtag = [{value: ''}];
  location = '';
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
      console.log(new Date(this.mode.startedfrom).getDate() + '/' + (new Date( this.mode.startedfrom).getMonth() + 1 ) + '/' + new Date(this.mode.startedfrom).getFullYear());
      this.campForm.patchValue({
        name: this.mode.name,
        category: this.mode.category._id,
        subcategory: this.mode.subcategory._id,
        imgUrl: this.mode.imgUrl,
        description: this.mode.description,
        maxparticipant: this.mode.maxparticipant,
        maxearning: this.mode.maxearning,
        startedfrom: new Date(this.mode.startedfrom),
        expireson: new Date(this.mode.expireson),
        webViewUrl: this.mode.webViewUrl,
        bioLink: this.mode.bioLink,
        brand: this.mode.brand._id,
        submitioncount: this.mode.submitioncount,
        applicationClosed: this.mode.applicationClosed
      });
      this.requirements = this.mode.requirements.length > 0 ? this.mode.requirements.map(ele => {
        return {
          value: ele
        };
      }) : [{value: ''}];
      this.todonext = this.mode.todonext.length > 0 ? this.mode.todonext.map(ele => {
        return {
          value: ele
        };
      }) : [{value: ''}];
      this.questions = this.mode.questions.length > 0 ? this.mode.questions.map(ele => {
        return {
          value: ele
        };
      }) : [{value: ''}];
      this.otherlink = this.mode.otherLink.length > 0 ? this.mode.otherLink :  [{title: '', link: '', isOpenable: false}];
      this.tags = this.mode.tags.length > 0 ? this.mode.tags.map(ele => {
        return {
          value: ele
        };
      }) : [{value: ''}];
      this.hashtag = this.mode.hashtag.length > 0 ? this.mode.hashtag.map(ele => {
        return {
          value: ele
        };
      }) : [{value: ''}];
      this.location = this.mode.location ? this.mode. location : '';
    }
    if (this.modal === 'none') {
      this.campForm.reset();
      this.otherlink = [{title: '', link: '', isOpenable: false}];
      this.requirements = [{value: ''}];
      this.todonext = [{value: ''}];
      this.questions = [{value: ''}];
      this.tags = [{value: ''}];
      this.hashtag = [{value: ''}];
      this.location = '';
    }
  }
  onSubmit() {
    // if (this.campForm.invalid) {
    //   return;
    // }
    const body = {
      ...this.campForm.getRawValue(),
      requirements: this.requirements.map(ele => ele.value).filter(ele => ele !== ''),
      otherLink: this.otherlink.filter(ele => ele.title !== '' && ele.link !== ''),
      todonext: this.todonext.map(ele => ele.value).filter(ele => ele !== ''),
      questions: this.questions.map(ele => ele.value).filter(ele => ele !== ''),
      tags: this.tags.map(ele => ele.value).filter(ele => ele !== ''),
      location: this.location,
      hashtag: this.hashtag.map(ele => ele.value).filter(ele => ele !== '')
    };
    console.log(body);
    if (this.mode) {
      this.apiService.updatecampaign(body, this.mode._id)
        .subscribe(resp => {
          this.data.emit(resp.result);
        });
    } else {
      this.apiService.createcampaign(body).subscribe(resp => {
        this.data.emit(resp.result);
      });
    }
  }
  onSelectCategory(id) {
    this.apiService.getAllSubCategoryByCategoryId(id)
      .subscribe(resp => {
        this.subcategories = resp.result;
      });
    this.apiService.getAllBrandsByCategoryID(id)
      .subscribe(resp => {
        this.brands = resp.result;
      });
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      const data = new FormData();
      data.append('image', file , file.name);
      this.apiService.fileUpload(data)
        .subscribe(resp => {
          if (resp.code === 0) {
              this.campForm.patchValue({
                imgUrl: resp.result
              });
          }
        });
    }
  }
  onChecked() {
    if (this.campForm.get('applicationClosed').value) {
      this.campForm.patchValue({
        applicationClosed: false
      });
    } else {
      this.campForm.patchValue({
        applicationClosed: true
      });
    }
  }
  plusReq() {
    this.requirements.push({value: ''});
  }
  plustodo() {
    this.todonext.push({value: ''});
  }
  plusOther() {
    this.otherlink.push({title: '', link: '', isOpenable: false});
  }
  plusQuestions() {
    this.questions.push({value: ''});
  }
  plusTags() {
    this.tags.push({value: ''});
  }
  plusHashTags() {
    this.hashtag.push({value: ''});
  }
}
