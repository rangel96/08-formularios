import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://restcountries.eu/rest/v2/lang/es';
  }

  getPaises(): any {
    const path = this.baseUrl;
    return this.http.get(path)
      .pipe(
        map( (resp: any[]) => {
          return resp.map( pais => {
            return {
              nombre: pais.name,
              codigo: pais.alpha3Code,
            };
          });
        })
      );
  }
}

export interface PaisI {
  nombre: string;
  codigo: string;
}
