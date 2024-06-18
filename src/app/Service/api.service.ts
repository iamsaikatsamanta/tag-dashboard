import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { categorymodel } from '../models/category.model';
import { filemodel } from '../models/file.model';
import { subcategorymodel } from '../models/subcategory.model';
import { brandmodel } from '../models/brand.model';
import { campaignmodel } from '../models/campaign.model';
import {environment} from '../../environments/environment';
import {RESTAPI} from '../models/RESTAPI';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  fileUpload(file) {
    return this.http.post<RESTAPI>(this.apiUrl + 'file-upload', file);
  }
  getcategorylist(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-categories?page=${page}&limit=${limit}`);
  }
  categorySearch(page, limit, term) {
    return this.http.get<RESTAPI>(this.apiUrl + `category-search?page=${page}&limit=${limit}&term=${term}`);
  }
  createcategory(newcategory) {
    return this.http.post<RESTAPI>(this.apiUrl + 'create-category', newcategory);
  }
  deletecategory(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'delete-categories', data);
  }
  updateCategory(data, id) {
    return this.http.post<RESTAPI>(this.apiUrl + `update-category/${id}`, data);
  }
  getsubcategorylist(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-subcategory?page=${page}&limit=${limit}`);
  }
  createsubcategory(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'create-sub-category', data);
  }
  updatesubcategory(data, id) {
    return this.http.post<RESTAPI>(this.apiUrl + `update-sub-category/${id}`, data);
  }
  deletesubcategory(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'delete-subcategories', data);
  }
  getAllSubCategoryByCategoryId(id) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-subcategories/${id}`);
  }
  getallbrands(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-brands?page=${page}&limit=${limit}`);
  }
  createbrand(newbrand) {
    return this.http.post<RESTAPI>(this.apiUrl + 'create-brand', newbrand);
  }
  updatebrand(newbrand, id) {
    return this.http.post<RESTAPI>(this.apiUrl + `update-brand/${id}`, newbrand);
  }
  deleteBrand(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'delete-brand', data);
  }
  getallcampaigns(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `show-all-campaign-dashboard?page=${page}&limit=${limit}`);
  }
  getallOngoingCampaign(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `showpendingcampaign?page=${page}&limit=${limit}`);
  }
  getallCompletedCampaign(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `showallcompletedcampaign?page=${page}&limit=${limit}`);
  }
  getcampaignbyId(id) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-campaigndetails/${id}`);
  }
  getAllBrandsByCategoryID(id) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-allbrand/${id}`);
  }
  createcampaign(campaign) {
    return this.http.post<RESTAPI>(this.apiUrl + 'create-campaign', campaign);
  }
  updatecampaign(campaign, id) {
    return this.http.post<RESTAPI>(this.apiUrl + `update-campaign/${id}`, campaign);
  }
  deletecampaign(campaign) {
    return this.http.post<RESTAPI>(this.apiUrl + 'delete-campaign', campaign);
  }
  getusersofcampaign(campaign, page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-user/${campaign}?page=${page}&limit=${limit}`);
  }
  approveCamp(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `participation-approval`, data);
  }
  rejectCamp(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `participation-rejected`, data);
  }
  taskApproval(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'task-approval', data);
  }
  taskNeedModification(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'need-modification', data);
  }
  getUserCampByStatus(data , id, page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `user-campaign-status/${id}?status=${data}&page=${page}&limit=${limit}`);
  }
  paymentStatus(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `release-payment`, data);
  }
  getAllUser(page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-all-users?page=${page}&limit=${limit}`);
  }
  userSearch(term, page, limit) {
    return this.http.get<RESTAPI>(this.apiUrl + `user-search?term=${term}&page=${page}&limit=${limit}`);
  }
  userCapaignSearch(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `usercampaign-search`, data);
  }
  usercampFilterDown(data, id, status) {
    return this.http.get<RESTAPI>
    (this.apiUrl + `usercamp-filter-down/${id}?follower=${data.follower}&er=${data.er}&city=${data.city}&status=${status}`);
  }
  usercampFilterUp(data, id, status) {
    return this.http.get<RESTAPI>
    (this.apiUrl + `usercamp-filter-up/${id}?follower=${data.follower}&er=${data.er}&city=${data.city}&status=${status}`);
  }
  getFeed(id) {
    return this.http.get<RESTAPI>(this.apiUrl + `get-feed/${id}`);
  }
  bulkNotification(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `bulk-notification`, data);
  }
  userCampCount(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'count-campaign', data);
  }
  syncLinks(data) {
    return this.http.post<RESTAPI>(this.apiUrl + 'sync-links', data);
  }
  getApprovedCampaign(id) {
    return this.http.get<RESTAPI>(this.apiUrl + `show-approved-campaign/${id}`);
  }
  bulkNotificationCity(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `bulk-notification-city`, data);

  }
  notificationUsercampaign(data) {
    return this.http.post<RESTAPI>(this.apiUrl + `notification-usercampaign`, data);

  }
}

