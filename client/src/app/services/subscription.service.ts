import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

const VAPID_PUBLIC = "BNhZ_xBn761AcFJaGpVEirwMKLfSWQsr0jitiQbdBVMpV2zV7aNp0cQszu98R6JLIIdfnzbLWGvC8qQZHLNaj_w";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private swPush: SwPush) {
  }

  requestSubscription() {
    if (this.swPush.isEnabled) {
      console.log('Entre en subscripcion');
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC,
      })
        .then(subscription => {
          //send subscription to the server
        })
        .catch(console.error)
    }
  }
}
