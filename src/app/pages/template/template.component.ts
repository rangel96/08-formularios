import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService, PaisI } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Eric',
    apellido: 'Rangel',
    email: 'eric@gmail.com',
    pais: 'MEX',
    genero: 'M',
  };

  paises: string[];

  constructor(private pais: PaisesService) {
    this.pais.getPaises().subscribe((paises: any) => {
      this.paises = paises;

      // Agregamos una nueva opcion en la lista de paises
      /*this.paises.unshift({
        nombre: '[ Selecione un País ]',
        codigo: '',
      });*/
    });
  }

  ngOnInit(): void {
  }

  saveForm(form: NgForm): void {
    console.log(form);

    if (form.invalid) {

      Object.values(form.controls).forEach(control => {
        // console.log(control);
        // control.touched = true;
        control.markAsTouched();
      });

      return;
    }
    console.log(form.value);
  }
}
