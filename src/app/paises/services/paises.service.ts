import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private urlBase: string = environment.apiUrl;

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name;capital;alpha2Code;flag;population'
    );
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.urlBase}/name/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarPorCapital(termino: string): Observable<Country[]> {
    const url = `${this.urlBase}/capital/${termino}`;

    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarPorId(id: string): Observable<Country> {
    const url = `${this.urlBase}/alpha/${id}`;

    return this.http.get<Country>(url);
  }

  buscarPorRegion(region: string): Observable<Country[]> {
    const url = `${this.urlBase}/region/${region}`;

    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}
