import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  displayedColumns: string[] = ['idPaciente','nombres','apellidos','acciones'];
  dataSource: MatTableDataSource<Paciente>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    // Variables Reactivas: pacienteCambio, mensajeCambio
    this.pacienteService.pacienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000});
    });
  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPaciente: number){
    this.pacienteService.eliminar(idPaciente).subscribe( () => {
      this.pacienteService.listar().subscribe( data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('USUARIO HA SIDO ELIMINADO');
      });
    });
  }

}
