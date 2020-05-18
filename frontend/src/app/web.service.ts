import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Task from './models/task';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;

  constructor(private httpClient: HttpClient) {
    this.ROOT_URL = "http://localhost:3000";
  }

 get(url: string){
  return this.httpClient.get(`${this.ROOT_URL}/${url}`);
 }

 post(url: string, data){
  return this.httpClient.post(`${this.ROOT_URL}/${url}`, data);
 }
 patch(url: string, data){
  return this.httpClient.patch(`${this.ROOT_URL}/${url}`, data);
 }
 delete(url: string){
  return this.httpClient.delete(`${this.ROOT_URL}/${url}`);
 }
}
