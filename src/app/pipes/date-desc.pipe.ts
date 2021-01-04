import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDesc'
})
export class DateDescPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
