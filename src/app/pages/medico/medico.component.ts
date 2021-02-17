import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from './../../_model/medico';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MedicoService } from './../../_service/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.medicoService.getMedicoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.medicoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000});
    });

    this.medicoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  filtrar(valor: string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(medico?: Medico){
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogComponent, {
      width: '250px',
      data: med
    });
  }

  eliminar(medico: Medico){
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap( () => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.setMedicoCambio(data);
      this.medicoService.setMensajeCambio('SE ELIMINO El MEDICO');
    });
  }

}
