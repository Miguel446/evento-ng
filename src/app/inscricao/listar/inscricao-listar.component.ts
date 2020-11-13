import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

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

  eventoSelecionado: Evento;
  cpf: string = '';
  nome: string = '';
  pagina: number;
  totalLinhas: number;

  totalInscricoes: number;

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private service: InscricaoService,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.totalLinhas = 30;
    this.listarEventos();
  }

  form() {
    this.router.navigate(["/inscricao/form"]);
  }

  consultar() {
    if (!this.eventoSelecionado || this.eventoSelecionado == '') {
      return this.snackbar.open("Por favor, selecione um evento", "Erro", { duration: 3000 });
    }

    this.service.consultar(this.eventoSelecionado.id, this.cpf, this.nome, this.pagina, this.totalLinhas).subscribe(
      data => {
        const inscricoes = data.content as Inscricao[];
        this.totalInscricoes = data.totalElements;
        this.dataSource = new MatTableDataSource<Inscricao>(inscricoes);
      },
      e => {
        this.errorAlert(e);
      }
    );
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.totalLinhas = pageEvent.pageSize;
    this.consultar();
  }

  listarEventos() {
    this.eventoService.listar().subscribe(
      data => {
        this.eventos = data as Evento[];
        if (this.eventos.length > 0) {
          this.eventoSelecionado = this.eventos[0];
        }

        this.consultar();
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


