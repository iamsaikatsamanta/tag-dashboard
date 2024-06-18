import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { BrandComponent } from './brand/brand.component';
import { CampaignComponent } from './campaign/campaign.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './Service/token-interceptor.service';
import { AddNewComponent } from './category/add-new/add-new.component';
import { AddNewSubcategoryComponent } from './subcategory/add-new-subcategory/add-new-subcategory.component';
import { AddNewBrandComponent } from './brand/add-new-brand/add-new-brand.component';
import { AddNewCampaignComponent } from './campaign/add-new-campaign/add-new-campaign.component';
import { MainpagesComponent } from './mainpages/mainpages.component';
import { UsercampaignComponent } from './usercampaign/usercampaign.component';
import { UsercampaigndetailsComponent } from './usercampaigndetails/usercampaigndetails.component';
import { UserComponent } from './user/user.component';
import {ToastrModule} from 'ngx-toastr';
import {AdminGuard} from './Service/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PayoutoptionComponent } from './usercampaign/payoutoption/payoutoption.component';
import {BsDatepickerModule} from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { QandaComponent } from './usercampaign/qanda/qanda.component';
import { from } from 'rxjs';
import { FeedsComponent } from './usercampaign/feeds/feeds.component';
import { BulkNotificationComponent } from './bulk-notification/bulk-notification.component';
import { AppliedcampDetelsComponent } from './usercampaign/appliedcamp-detels/appliedcamp-detels.component';
import { ShowapprovedcampComponent } from './showapprovedcamp/showapprovedcamp.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    CategoryComponent,
    SubcategoryComponent,
    BrandComponent,
    CampaignComponent,
    LoginComponent,
    AddNewComponent,
    AddNewSubcategoryComponent,
    AddNewBrandComponent,
    AddNewCampaignComponent,
    MainpagesComponent,
    UsercampaignComponent,
    UsercampaigndetailsComponent,
    UserComponent,
    PayoutoptionComponent,
    QandaComponent,
    FeedsComponent,
    BulkNotificationComponent,
    AppliedcampDetelsComponent,
    ShowapprovedcampComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  ,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
