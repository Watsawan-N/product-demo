import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function toTrimmedValue(control: AbstractControl): string {
  const value = control.value;
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = toTrimmedValue(control);

    if (!value) {
      return null;
    }

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) && parsedValue > 0 ? null : { positiveNumber: true };
  };
}

export function maxDecimalPlacesValidator(maxDecimalPlaces: number): ValidatorFn {
  const pattern = new RegExp(`^\\d+(\\.\\d{1,${maxDecimalPlaces}})?$`);

  return (control: AbstractControl): ValidationErrors | null => {
    const value = toTrimmedValue(control);

    if (!value) {
      return null;
    }

    return pattern.test(value) ? null : { maxDecimalPlaces: true };
  };
}

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = toTrimmedValue(control);

    if (!value) {
      return null;
    }

    return /^\d+$/.test(value) ? null : { integer: true };
  };
}

export function minNumberValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = toTrimmedValue(control);

    if (!value) {
      return null;
    }

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) && parsedValue >= minValue ? null : { minNumber: true };
  };
}
