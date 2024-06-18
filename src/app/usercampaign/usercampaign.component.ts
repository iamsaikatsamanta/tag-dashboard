import { Component, OnInit } from '@angular/core';
import {ApiService} from '../Service/api.service';
import { ActivatedRoute } from '@angular/router';
declare var require: any;
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
const flatten = require('flat');
import { ToastrService } from 'ngx-toastr';
import { async } from 'q';



@Component({
  selector: 'app-usercampaign',
  templateUrl: './usercampaign.component.html',
  styleUrls: ['./usercampaign.component.css']
})
export class UsercampaignComponent implements OnInit {
  userCamp = [];
  _id = '';
  chakced = [];
  term = '';
  page = 1;
  perpage = 100;
  public modal = 'none';
  mode;
  userscampcsv: any = [];
  changedcampcsv = [];
  campaignname = '';
  brandname = '';
  modalPayment = 'none';
  total;
  paymentModalOption;
  status = 'All';
  approvebutton = true;
  rejectbutton = true;
  taskapprovebutton = true;
  needmodificationbutton = true;
  releasepaymentbutton = true;
  questionModal = 'none';
  question;
  filterData = {
    follower : 500,
    er: 1.0,
    city: ''
  };
  feedModal = 'none';
  feedId = null;
  campData = null;
  link = null;
  userCampModal = 'none';
  userCampData = null;
  noti = {
    title: '',
    content: '',
    status: ''
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute, private toaster: ToastrService) { }

  async ngOnInit() {

    this._id = this.route.snapshot.paramMap.get('id');
    this.chakced = [];
    this.getUserCapByStatus();
    this.apiService.getcampaignbyId(this._id).subscribe( res => {
        this.campaignname = res.result.name;
        this.brandname = res.result.brand.name;
        this.campData = {
        tags: res.result.tags,
        hashtag:  res.result.hashtag,
        location:  res.result.location,
        bioLink:  res.result.bioLink,
      };
      });
      // console.log(this.userCamp);
  }

  openModal(index) {
    this.mode = this.userCamp[index].user;
    this.modal = 'block';
    // console.log(this.categories);
  }
  closeModal() {
    this.mode = null;
    this.modal = 'none';
  }
  openModalPayment(data) {
    if (this.chakced.length === 0 ) {
      return;
    }
    if (data === 'Release Payment') {
      this.paymentModalOption = 'Payment Amount';
    } else {
      this.paymentModalOption = 'What To Modify';
    }
    this.modalPayment = 'block';
    // console.log(this.categories);
  }
  closeModalPayment() {
    this.paymentModalOption = null;
    this.modalPayment = 'none';
  }
  openUserCampModal(index) {
    this.apiService.userCampCount({user: [this.userCamp[index].user._id]})
    .subscribe(resp => {
      this.userCampModal = 'block';
      this.userCampData = resp.result;
    });
  }
  closeUserCampModal() {
    this.userCampModal = 'none';
    this.userCampData = null;
  }
  selectAll() {
    if (this.chakced.length > 0) {
      this.chakced = [];
      this.userCamp.forEach(ele => {
        ele.checked = false;
      });
    } else {
      this.userCamp.forEach(ele => {
        this.chakced.push(ele._id);
        ele.checked = true;
      });
    }
  }
  onApprove() {
    this.apiService.approveCamp({userCampaing_id: this.chakced})
    .subscribe(resp => {
      if (resp.code === 0) {
        this.ngOnInit();
        this.toaster.success(' approved');
      }
    });
  }
  onReject() {
    this.apiService.rejectCamp({userCampaing_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
          this.toaster.success(' rejected');
        }
      });
  }
  onTaskApproval() {
    this.apiService.taskApproval({userCampaing_id: this.chakced})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.ngOnInit();
          this.toaster.success('task approved');
        }
      });
  }
  getUserCapByStatus(statuss?) {
    this.status = statuss === '' || statuss === undefined ? 'All' : statuss;
    this.apiService.getUserCampByStatus(this.status, this._id, this.page, this.perpage)
      .subscribe(async resp => {
        this.userCamp = resp.result.usercampaign;
        this.total = resp.result.count;
        console.log(this.userCamp);
      });
    this.chakced = [];
    if (this.status === 'Pending') {
       this.approvebutton = false;
       this.rejectbutton = false;
       this.taskapprovebutton = true;
       this. needmodificationbutton = true;
       this. releasepaymentbutton = true;
      }
    if (this.status === 'Approved') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = true;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = true;
     }
    if (this.status === 'Link Submitted') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = false;
      this. needmodificationbutton = false;
      this. releasepaymentbutton = true;
     }
    if (this.status === 'Need Modification') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = false;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = true;
     }
    if (this.status === 'Task Approved') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = true;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = false;
     }
    if (this.status === 'Not Approved') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = true;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = true;
     }
    if (this.status === 'Payment Released') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = true;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = true;
     }

    if (this.status === 'All') {
      this.approvebutton = true;
      this.rejectbutton = true;
      this.taskapprovebutton = true;
      this. needmodificationbutton = true;
      this. releasepaymentbutton = true;
     }

  }
  search() {
    if (this.term === '') {
      this.getUserCapByStatus(this.status);
    }
    this.apiService.userCapaignSearch({campain_id: this._id, query: this.term})
    .subscribe(resp => {
      this.userCamp = resp.result;
    });
  }
  onChecked(id) {
    if (this.chakced.includes(id)) {
      this.chakced = this.chakced.filter(ele => ele !== id);
      this.userCamp.find(ele => ele._id === id).chakced = false;
    } else {
      this.chakced.push(id);
      this.userCamp.find(ele => ele._id === id).chakced = true;
    }
    console.log(this.chakced);

  }
  viewPost(index) {
    this.feedModal = 'block';
    this.feedId = this.userCamp[index].feed;
    this.link = this.userCamp[index].postLink[0];
   }
  openInstagram(index) {
    window.open('https://www.instagram.com/' + this.userCamp[index].user.instagram_id, 'Instagram View' , 'toolbar=0,width=800,height=400');
  }

  async exportToCsv() {
     this.changedcampcsv = await this.userCamp.map(ele => {
      return {
        name: ele.user.name,
        email: ele.user.email,
        instagram_id: ele.user.instagram_id ? ele.user.instagram_id : '-',
        phoneNo: ele.user.phoneNo,
        address: ele.user.address &&  ele.user.address.city ? ele.user.address.street_name + ',' + ele.user.address.landmark + ',' +
        // tslint:disable-next-line: max-line-length
        ele.user.address.flat_no + ',' + ele.user.address.building_name + ',' + ele.user.address.city + ',' + ele.user.address.pincode + ',' + ele.user.address.state : '-',
        applicationDate: ele.updatedAt,
        follower: ele.user.scrapped_data ? ele.user.scrapped_data.follower : '-',
        engagement: ele.user.scrapped_data && ele.user.scrapped_data.engagementrate ? ele.user.scrapped_data.engagementrate : '-',
        post: ele.user.scrapped_data && ele.user.scrapped_data.totalpost,
        paytmNo: ele.user.paytmNo ? ele.user.paytmNo : '-',
        payout: ele.paymentAmount ? ele.paymentAmount : '-'
      };
    });
     const options = {
      showLabels: true,
      useBom: true,
      nullToEmptyString: false,
      headers: ['Name', 'Email', 'Instagram Id', 'Phone No', 'Address', 'Application Date', 'Follower', 'Engagement Rate', 'Posts', 'Paytm No', 'Payout']
    };
    // tslint:disable-next-line:no-unused-expression
     new Angular5Csv(this.changedcampcsv, this.status, options);

  }

  onchangePage(pageData) {
    this.page = pageData.page ;
    this.getUserCapByStatus(this.status);
  }
  receiveData(event) {
    this.modalPayment = 'none';
    this.ngOnInit();
  }

  openQuestionModal(index) {
    this.questionModal = 'block';
    this.question = this.userCamp[index].question;
  }
  closeQuestionModal() {
    this.questionModal = 'none';
  }
  closeFeedModal() {
    this.feedModal = 'none';
    this.link = null;
    this.feedId = null;
  }
  async applyFilter() {
    console.log(this.filterData);
    await this.apiService.usercampFilterDown(this.filterData, this._id, this.status)
    .subscribe(resp => {
      this.userCamp = resp.result.map(ele => {
        return {
          ...ele,
          user: {...ele.user[0], scrapped_data: {...ele.scrap_data[0]}}
        };
      });
    });
  }
  async apply() {
    console.log(this.filterData);
    await this.apiService.usercampFilterUp(this.filterData, this._id, this.status)
    .subscribe(resp => {
      this.userCamp = resp.result.map(ele => {
        return {
          ...ele,
          user: {...ele.user[0], scrapped_data: {...ele.scrap_data[0]}}
        };
      });
    });
  }
  sendNoti() {
    if (this.noti.title === '' || this.noti.content === '' || this.noti.status === '') {
      this.toaster.warning('Enter Proper Data For Notification');
      return;
    }
    this.apiService.notificationUsercampaign({id: this._id, status: this.noti.status})
      .subscribe(resp => {
        if (resp.code === 0) {
          this.toaster.success('Notification Sent');
        }
      });
  }
}
