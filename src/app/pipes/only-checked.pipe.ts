import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onlyChecked'
})
export class OnlyCheckedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let getArray: any = [];
    for (const item of value) {
      item.checked == true ? getArray = [...getArray, item] : '';

    }
    return getArray;


  }

}
