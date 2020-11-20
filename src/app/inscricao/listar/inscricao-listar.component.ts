import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formFiltro: FormGroup;

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
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private service: InscricaoService,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.totalLinhas = 30;
    this.listarEventos();

    this.gerarForm();
  }

  gerarForm() {
    this.formFiltro = this.fb.group({
      nome: [''],
      cpf: ['']
    });

    this.formFiltro.get('nome').valueChanges.subscribe(nome => {
      this.nome = nome;
      this.pagina = 0;
      this.paginator.firstPage();
      this.consultar();
    });

    this.formFiltro.get('cpf').valueChanges.subscribe(cpf => {
      this.cpf = cpf;
      this.pagina = 0;
      this.paginator.firstPage();
      this.consultar();
    });
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

  imprimir(inscricao: Inscricao) {
    console.log(inscricao);
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


