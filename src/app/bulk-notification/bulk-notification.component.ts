import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-notification',
  templateUrl: './bulk-notification.component.html',
  styleUrls: ['./bulk-notification.component.css']
})
export class BulkNotificationComponent implements OnInit {

  title = '';
  content = '';
  city = 'All';
  constructor(private apiService: ApiService, private toaster: ToastrService) { }

  ngOnInit() {
  }
  send() {
    if (this.title === '' || this.content === '') {
      this.toaster.warning('Fields Can\'t be Empty');
      return;
    }
    if (this.city === 'All') {
      this.apiService.bulkNotification({title: this.title, content: this.content})
        .subscribe(resp => {
          if (resp.code === 0) {
            this.toaster.success('Notification Sent');
            this.title = '';
            this.content = '';
            this.city = 'All';
          }
        });
    } else {
      this.apiService.bulkNotificationCity({title: this.title, content: this.content, city: this.city})
        .subscribe(resp => {
          if (resp.code === 0) {
            this.toaster.success('Notification Sent');
            this.title = '';
            this.content = '';
            this.city = 'All';

          }
        });
    }
  }

}
