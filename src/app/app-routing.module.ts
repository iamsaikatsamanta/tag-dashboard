import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { BrandComponent } from './brand/brand.component';
import { CampaignComponent } from './campaign/campaign.component';
import { LoginComponent } from './login/login.component';
import { MainpagesComponent } from './mainpages/mainpages.component';
import { UsercampaignComponent } from './usercampaign/usercampaign.component';
import { UsercampaigndetailsComponent } from './usercampaigndetails/usercampaigndetails.component';
import {UserComponent} from './user/user.component';
import {AdminGuard} from './Service/auth.guard';
import { BulkNotificationComponent } from './bulk-notification/bulk-notification.component';
import { ShowapprovedcampComponent } from './showapprovedcamp/showapprovedcamp.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainpagesComponent,
    canActivate: [AdminGuard],
    children: [
      {
      path: 'category',
      component: CategoryComponent
     },
     {
      path: 'subcategory',
      component: SubcategoryComponent
     },
     {
        path: 'brand',
        component: BrandComponent
     },
     {
       path: 'campaign',
       component: CampaignComponent
     },
     {
       path: 'usercampaign/:id',
       component: UsercampaignComponent
     },
     {
       path: 'usercampaigndetails/:id',
       component : UsercampaigndetailsComponent
     },
      {
        path: 'users',
        component : UserComponent
      },
      {
        path: 'notification',
        component : BulkNotificationComponent
      },
      {
        path: 'show-approved-links/:id',
        component : ShowapprovedcampComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
