import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Evento } from '../../../shared/models/evento.model';
import { EventoService } from '../../../shared/services/cadastro/evento.service';

import { ConfirmarDialog } from '../../../shared/dialogs/remover.dialog';

@Component({
  selector: 'app-evento-listar',
  templateUrl: './evento-listar.component.html',
  styleUrls: ['./evento-listar.component.css']
})
export class EventoListarComponent implements OnInit {

  dataSource: MatTableDataSource<Evento>;
  colunas: string[] = ['nome', 'local', 'dataInicial', 'dataFinal', 'acao'];

  constructor(
    private router: Router,
    private service: EventoService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  form() {
    this.router.navigate(['/cadastro/evento/form']);
  }

  listar() {
    this.service.listar().subscribe(
      data => {
        console.log(data);
        const eventos = data as Evento[];
        this.dataSource = new MatTableDataSource<Evento>(eventos);
      },
      e => {
        console.log(e);
        let msg: string = "Tente novamente em instantes.";
        if (e.status != 0) {
          msg = e.error.msg;
        }
        this.snackbar.open(msg, 'Erro', { duration: 3000 });
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
        let msg: string = "Tente novamente em instantes.";
        if (e.status != 0) {
          msg = e.error.msg;
        }
        this.snackbar.open(msg, 'Erro', { duration: 3000 });
      }
    );
  }

}
