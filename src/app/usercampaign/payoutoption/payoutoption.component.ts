import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ApiService} from '../../Service/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-payoutoption',
  templateUrl: './payoutoption.component.html',
  styleUrls: ['./payoutoption.component.css']
})
export class PayoutoptionComponent implements OnInit, OnChanges {

  @Input('mode') mode;
  @Input('modal') modal;
  @Input('chakced') chakced;
  @Output() data = new EventEmitter<any>();
  inputField = '';
  constructor(private apiService: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.inputField = '';
  }
  releasePayment() {
    if (this.inputField === '') {
      this.toaster.error('Field Can\'t Be Empty');
      return;
    }
    this.apiService.paymentStatus({userCampaing_id: this.chakced, amount: this.inputField})
      .subscribe(resp => {
        this.data.emit(resp);
      });
  }
  needModification() {
    if (this.inputField === '') {
      this.toaster.error('Field Can\'t Be Empty');
      return;
    }
    this.apiService.taskNeedModification({userCampaing_id: this.chakced, needmodtext: this.inputField})
      .subscribe(resp => {
        this.data.emit(resp);
      });
  }

}
