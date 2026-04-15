import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/**
 * Counts NCR rows whose dispositionStatus matches the given value.
 * Usage: {{ ncrReports.controls | ncrFilter:'Open' }}
 */
@Pipe({ name: 'ncrFilter', pure: false })
export class NcrFilterPipe implements PipeTransform {
  transform(controls: AbstractControl[], dispositionStatus: string): number {
    return controls.filter(c => c.get('dispositionStatus')?.value === dispositionStatus).length;
  }
}

/**
 * Counts NCR rows whose severity matches the given value.
 * Usage: {{ ncrReports.controls | ncrSeverityFilter:'Critical' }}
 */
@Pipe({ name: 'ncrSeverityFilter', pure: false })
export class NcrSeverityFilterPipe implements PipeTransform {
  transform(controls: AbstractControl[], severity: string): number {
    return controls.filter(c => c.get('severity')?.value === severity).length;
  }
}
