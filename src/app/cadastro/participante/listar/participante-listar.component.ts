import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ParticipanteService } from '../../../shared/services/cadastro/participante.service';
import { Participante } from '../../../shared/models/participante.model';

import { ConfirmarDialog } from '../../../shared/dialogs/remover.dialog';

@Component({
  selector: 'app-participante-listar',
  templateUrl: './participante-listar.component.html',
  styleUrls: ['./participante-listar.component.css']
})
export class ParticipanteListarComponent implements OnInit {

  dataSource: MatTableDataSource<Participante>;
  colunas: string[] = ['nome', 'cidade', 'empresa', 'categoria', 'acao'];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private service: ParticipanteService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  form() {
    this.router.navigate(["/cadastro/participante/form"]);
  }

  listar() {
    this.service.listar().subscribe(
      data => {
        const participantes = data as Participante[];
        this.dataSource = new MatTableDataSource<Participante>(participantes);
      },
      e => {
        this.errorAlert(e);
      }
    );
  }

  removerDialog(id: string) {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(Number(id));
      }
    });
  }

  remover(id: number) {
    this.service.remover(id).subscribe(
      data => {
        this.snackbar.open('Item removido!', 'Sucesso', {
          duration: 3000,
          panelClass: ['ok'],
        });
        this.listar();
      },
      e => {
        this.errorAlert(e);
      }
    );
  }

  private errorAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
