import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  pid:any=0
  product:any={}

  constructor(private aroute:ActivatedRoute,private api:ApiService){
    this.aroute.params.subscribe((res:any)=>{
      // console.log(res.id);
      this.pid=res.id
      
    })
  }
ngOnInit() {
  this.getData()
}
getData(){
  this.api.getProduct(this.pid).subscribe((res:any)=>{
    this.product=res
    // console.log(this.product);
    
  })
}
  

}
