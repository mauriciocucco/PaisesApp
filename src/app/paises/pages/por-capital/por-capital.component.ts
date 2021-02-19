import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisesService: PaisesService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisesService.buscarPorCapital(this.termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }
}
