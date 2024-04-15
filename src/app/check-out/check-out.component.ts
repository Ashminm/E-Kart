import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {

  checkoutStatus:boolean=false
  total:any=sessionStorage.getItem("totalAmount")
  payPalConfig?: IPayPalConfig;

  checkoutForm=this.fb.group({
    username:['',[Validators.pattern('[a-zA-Z ]*'),Validators.required]],
    address:['',[Validators.pattern('[a-zA-Z 0-9@!,.]*'),Validators.required]],
    pincode:['',[Validators.pattern('[0-9]*'),Validators.required,Validators.minLength(6)]],
    state:['',[Validators.pattern('[a-zA-Z]*'),Validators.required]],
    phone:['',[Validators.pattern('[0-9]*'),Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
  })

  constructor(private fb:FormBuilder,private toster:ToastrService,private api:ApiService,private route:Router){}


  proceedCheckout() {
    if (this.checkoutForm.valid) {
      this.checkoutStatus = true;
      this.initConfig()
    } else {
      this.toster.info("Invalid Details. Please provide correct details!!");
    }
  }

  cancelCheckout(){
    this.checkoutForm.reset()
  }

  initConfig() {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: this.total,
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: this.total
                        }
                    }
                },
                // items: [{
                //     name: 'Enterprise Subscription',
                //     quantity: '1',
                //     category: 'DIGITAL_GOODS',
                //     unit_amount: {
                //         currency_code: 'EUR',
                //         value: '9.99',
                //     },
                // }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any )=> {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.emptycartApi().subscribe((res:any)=>{
              this.api.getCartCountApi()
              this.toster.success("transaction Completed for Checking Out Cart")
              this.checkoutStatus=false
              this.checkoutForm.reset()
              this.route.navigateByUrl('/')
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toster.error("Transaction has been Cancelled!!")

        },
        onError: err => {
            console.log('OnError', err);
            this.toster.error("Transaction cancelled! please try after sometimes!!")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}


}
