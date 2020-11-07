import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { InscricaoService } from '../../shared/services/inscricao/inscricao.service';
import { Inscricao } from '../../shared/models/inscricao.model';
import { EventoService } from '../../shared/services/cadastro/evento.service';
import { Evento } from '../../shared/models/evento.model';

import { ConfirmarDialog } from '../../shared/dialogs/remover.dialog';

@Component({
  selector: 'app-inscricao-listar',
  templateUrl: './inscricao-listar.component.html',
  styleUrls: ['./inscricao-listar.component.css']
})
export class InscricaoListarComponent implements OnInit {

  dataSource: MatTableDataSource<Inscricao>;
  colunas: string[] = ['nome', 'empresa', 'evento', 'acao'];

  eventos: Evento[];

  eventoId: string = '';
  cpf: string = '';
  nome: string = '';

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private service: InscricaoService,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.listarEventos();
  }

  form() {
    this.router.navigate(["/inscricao/form"]);
  }

  consultar() {
    if (!this.eventoId) {
      this.eventoId = '';
    }

    this.service.consultar(this.eventoId, this.cpf, this.nome).subscribe(
      data => {
        const inscricoes = data as Inscricao[];
        console.log(inscricoes);
        this.dataSource = new MatTableDataSource<Inscricao>(inscricoes);
      },
      e => {
        this.errorAlert(e);
      }
    );
  }

  listarEventos() {
    this.eventoService.listar().subscribe(
      data => {
        this.eventos = data as Evento[];
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
        this.consultar();
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
