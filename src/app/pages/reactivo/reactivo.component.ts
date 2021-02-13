import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css']
})
export class ReactivoComponent implements OnInit {

  form: FormGroup;

  constructor(private formB: FormBuilder, private validator: ValidatorsService) {
    this.createForms();
    this.loadData();
    this.createListeners();
  }

  ngOnInit(): void {
  }

  // Validar los control name por get
  /*get nombreNoValid(): boolean {
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }*/

  // Validar el control 'nombre' por el servicio NoNickname
  /*noNickname(controlName: string): boolean {
    return this.form.get(controlName).errors.noNickname;
  }*/


  // Validar los control name por un metodo
  controlNoValid(controlName: string): boolean {
    return this.form.get(controlName).invalid && this.form.get(controlName).touched;
  }

  // Validar el arreglo por un get
  get hobbies(): FormArray {
    return this.form.get('hobbies') as FormArray;
  }

  validarPassword(): boolean {
    return this.form.hasError('noSonIguales') && this.controlNoValid('confirmPassword');
  }


  createForms(): void {
    this.form = this.formB.group({
        nombre: ['', [Validators.required, Validators.minLength(3), this.validator.noNickname]],
        apellido: ['', [Validators.required, Validators.minLength(5)]],
        usuario: ['', Validators.required, this.validator.ValidarUsuario],
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        directory: this.formB.group({
          calle: ['', [Validators.required, Validators.minLength(5)]],
          colonia: ['', [Validators.required, Validators.minLength(5)]]
        }),
        hobbies: this.formB.array([]),
      },
      {
        validators: this.validator.ValidarPassword('password', 'confirmPassword'),
      });
  }

  loadData(): void {
    // this.form.setValue({
    this.form.reset({
      nombre: 'Eric',
      apellido: 'Rangel',
      usuario: 'EricRan90',
      email: 'eric@gmail.com',
      password: 'zxcvbn',
      confirmPassword: 'zxcvbn',
      directory: {
        calle: 'Carusso',
        colonia: 'Villas de San Frnacisco',
      },
    });
    ['Leer', 'Ver series'].forEach(value => this.hobbies.push(this.formB.control(value)));
  }

  createListeners(): void {
    // Se dispara cada vez que hay cambios en el formulario
    /*this.form.valueChanges.subscribe( value => {
      console.log(value);
    });*/

    // Se dispara cada vez que en el controlador selecionado hay un cambio
    this.form.get('confirmPassword').statusChanges.subscribe( value => {
      console.log(value);
    });
  }


  addHobby(): void {
    this.hobbies.push(this.formB.control(''));
  }

  deleteHobby(i: number): void {
    this.hobbies.removeAt(i);
  }


  submit(): void {
    // console.log(this.form);
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        console.log(control);

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(otherControl => otherControl.markAsTouched());
        }
        control.markAsTouched();
      });
    }

    // console.log(this.form.value);

    // Borrar formulario al hacer submit y dejar un nombre por defecto
    /*this.form.reset({
      nombre: 'Alberto'
    });*/
  }
}
