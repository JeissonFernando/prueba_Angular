import { Component, OnInit, Inject } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from 'src/app/_service/medico.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {

  medico: Medico;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private dialogRef: MatDialogRef<MedicoDialogComponent>,
    private medicoService : MedicoService
  ) { }

  ngOnInit(): void {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    this.medico.fotoUrl = this.data.fotoUrl;
  }

  operar(){
    
    if(this.medico != null && this.medico.idMedico > 0){
      // Modificar Practioca IDeal
      this.medicoService.modificar(this.medico).pipe(switchMap( () => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE MODIFICO EL MEDICO');
      });

      /* Mala Practica o Practica Comun
      this.medicoService.modificar(this.medico).subscribe( () => {
        this.medicoService.listar().subscribe(data => {
          this.medicoService.medicoCambio.next(data);
        });
      }); */

    } else {
      //Registrar
      this.medicoService.registrar(this.medico).pipe(switchMap( () => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio('SE REGISTRO EL MEDICO');
      });

      /* Mala Practica o Practica Comun
      this.medicoService.registrar(this.medico).subscribe( () => {
        this.medicoService.listar().subscribe(data => {
          this.medicoService.medicoCambio.next(data);
        });
      });*/
    }

    this.cancelar();
  }

  cancelar(){
    this.dialogRef.close();
  }

}
