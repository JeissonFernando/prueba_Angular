import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './../_model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url: string = `${environment.HOST}/pacientes`;

  pacienteCambio = new Subject<Paciente[]>();

  mensajeCambio = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente){
    return this.http.post(this.url, paciente);
  }

  modificar(paciente: Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
