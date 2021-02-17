import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Medico } from './../_model/medico';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {

  //url: string = `${environment.HOST}/medicos`;

  // Reactive variables
  private medicoCambio = new Subject<Medico[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http, 
      `${environment.HOST}/medicos`
    )
   }

  // Get Subjects
  getMedicoCambio(){
    return this.medicoCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  // Set Subjects
  setMedicoCambio(medicos: Medico[]){
    this.medicoCambio.next(medicos);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  /* CRUD
  listar(){
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  registrar(medico: Medico){
    return this.http.post(this.url, medico);
  }

  modificar(medico: Medico){
    return this.http.put(this.url, medico);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }
  */
}
