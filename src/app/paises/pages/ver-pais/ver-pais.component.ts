import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisesService: PaisesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisesService.buscarPorId(id)),
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais;
      });
    /* this.activatedRoute.params.subscribe(({ id }) => {
      this.paisesService.buscarPorId(id).subscribe((pais) => {
        console.log(pais);
      });
    }); */
  }
}
