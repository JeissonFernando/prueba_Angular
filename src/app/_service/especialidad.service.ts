import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Especialidad } from './../_model/especialidad';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad> {

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/especialidades`);
  }
}
