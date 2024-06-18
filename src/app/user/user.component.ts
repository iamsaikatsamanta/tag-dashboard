import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../app/Service/api.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any;
  file: any;
  public modal = 'none';
  perpage = 100;
  page = 1;
  totalPage;
  term = '';
  chakced = [];
  mode;
  changedcampcsv: any;
  userCampModal = 'none';
  userCampData = null;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getAllUser(this.page , this.perpage).subscribe(resp => {
      this.users = resp.result.users;
      this.users = this.users.map(ele => {
        return {
          ...ele,
          checked: false
        };
      });
      this.totalPage = resp.result.count;
    });
  }
  openModal(i) {
    this.mode = this.users[i];
    this.modal = 'block';
    // console.log(this.categories);
  }
  closeModal() {
    this.mode = null;
    this.modal = 'none';
  }
  search() {
    this.apiService.userSearch( this.term, this.page , this.perpage).subscribe(resp => {
      this.users = resp.result.users;
      this.users = this.users.map(ele => {
        return {
          ...ele,
          checked: false
        };
      });
      this.totalPage = resp.result.count;
    });
  }
  onChecked(id) {
    if (this.chakced.includes(id)) {
      this.chakced = this.chakced.filter(ele => ele !== id);
      this.users.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.users.find(ele => ele._id === id).chakced = true;
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
      this.users.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.users.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  onchangePage(pageData) {
    this.page = pageData.page ;
    this.ngOnInit();
    window.scroll(0, 0);
  }
  sort() {
    this.users.sort();
  }
  openInsta(i) {
    window.open('https://www.instagram.com/' + this.users[i].instagram_id, 'Instagram View' , 'toolbar=0,width=800,height=400');
  }
  async exportToCsv() {
    console.log(this.users);
    this.changedcampcsv = await this.users.map(ele => {
     return {
       name: ele.name,
       email: ele.email,
       instagram_id: ele.instagram_id ? ele.instagram_id : '-',
       phoneNo: ele.phoneNo,
        address: ele.address &&  ele.address.city ? ele.address.street_name + ',' + ele.address.landmark + ',' +
       // tslint:disable-next-line: max-line-length
      ele.address.flat_no + ',' + ele.address.building_name + ',' + ele.address.city + ',' + ele.address.pincode + ',' + ele.address.state : '-',
       joinDate: ele.updatedAt,
       follower: ele.scrapped_data ? ele.scrapped_data.follower : '-',
       engagement: ele.scrapped_data && ele.scrapped_data.engagementrate ? ele.scrapped_data.engagementrate : '-',
       post: ele.scrapped_data && ele.scrapped_data.totalpost,
       paytmNo: ele.paytmNo ? ele.paytmNo : '-'
     };
   });
    const options = {
     showLabels: true,
     useBom: true,
     nullToEmptyString: false,
     headers: ['Name', 'Email', 'Instagram Id', 'Phone No', 'Address', 'Follower', 'Engagement Rate', 'Paytm No'],
   };
   // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(this.users, "sadasd", options);

 }
  closeUserCampModal() {
    this.userCampModal = 'none';
    this.userCampData = null;
  }
  openUserCampModal(index) {
    this.apiService.userCampCount({user: [this.users[index]._id]})
      .subscribe(resp => {
        this.userCampModal = 'block';
        this.userCampData = resp.result;
      });
  }
}
