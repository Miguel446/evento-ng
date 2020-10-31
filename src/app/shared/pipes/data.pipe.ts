import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(data: string, args?: any): string {
    if (data == '') {
      return data;
    }
    let dataArray = data.split('-');
    return dataArray[2] + '/' + dataArray[1] + '/' + dataArray[0];
  }

}
