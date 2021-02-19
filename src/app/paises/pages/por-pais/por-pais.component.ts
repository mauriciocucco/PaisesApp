import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisesService: PaisesService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.paisesService.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  sugerencias(termino: string) {
    if (!termino) {
      this.mostrarSugerencias = false;
      return;
    }
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisesService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      (error) => (this.paisesSugeridos = [])
    );
  }

  buscarSugerido() {
    this.buscar(this.termino);
  }
}
