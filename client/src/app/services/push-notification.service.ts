import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PushNotificationService {

  API_URL = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  public postSubscription(subscription: PushSubscription) {
    return this.http.post(`${this.API_URL}/subscribe`, subscription)
  }
}
