import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noNickname(control: FormControl): ErrorValidator {
    if (control.value?.toLowerCase() === 'ericran90') {
      return { noNickname: true };
    }
    return null;
  }

  ValidarPassword(pass1: string, pass2: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }
      else {
        pass2Control.setErrors({ noSonIguales: true });
      }
    };
  }

  ValidarUsuario(control: FormControl): Promise<ErrorValidator> | Observable<ErrorValidator> {

    if (!control.valid) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (control.value.toLowerCase() === 'ericran90') {
        resolve({ existe: true });
      }
      else {
        resolve(null);
      }
    }, 3600);
  });
  }

}

interface ErrorValidator {
  [s: string]: boolean;
}
