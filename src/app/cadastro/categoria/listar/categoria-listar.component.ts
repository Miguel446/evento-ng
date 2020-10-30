import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CategoriaService } from '../../../shared/services/cadastro/categoria.service';
import { Categoria } from '../../../shared/models/categoria.model';

import { ConfirmarDialog } from '../../../shared/dialogs/remover.dialog';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css']
})
export class CategoriaListarComponent implements OnInit {

  dataSource: MatTableDataSource<Categoria>;
  colunas: string[] = ['nome', 'acao'];

  constructor(
    private router: Router,
    private service: CategoriaService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  form() {
    this.router.navigate(["/cadastro/categoria/form"]);
  }

  listar() {
    this.service.listar().subscribe(
      data => {
        const categorias = data as Categoria[];
        this.dataSource = new MatTableDataSource<Categoria>(categorias);
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
