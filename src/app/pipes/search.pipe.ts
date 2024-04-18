import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], searchKey:any):any[] {
   
    const result:any=[]
    if(!value || !searchKey){return value}
  
    value.forEach((item:any)=>{
      if(item.title.trim().toLowerCase().includes(searchKey.trim().toLowerCase()) ||  (item.price && item.price.toString().toLowerCase().includes(searchKey)))
        result.push(item)
    })
    
    return result;
  }

}
