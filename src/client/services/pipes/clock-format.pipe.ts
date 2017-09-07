import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockFormat'
})
export class ClockFormatPipe implements PipeTransform {
  transform(timer: number): string {
    // const units = longForm
    //   ? FILE_SIZE_UNITS_LONG
    //   : FILE_SIZE_UNITS;

    // let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    // power = Math.min(power, units.length - 1);

    // const size = sizeInBytes / Math.pow(1024, power); // size in new units
    // const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    // const unit = units[power];
    const minute = ("0" + Math.floor(timer / 60)).slice(-2);
    const seconds = ("0" + timer % 60).slice(-2);
    return `${minute}:${seconds}`;
  }
}