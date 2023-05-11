import { Pipe,PipeTransform } from '@angular/core';
@Pipe({
  name:'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform{
  transform(value:number): string {
    const hours=Math.floor(value/3600);
    const minutes=Math.floor((value%3600)/60);
    return `${hours} hours and ${minutes} minutes`;
  }
}