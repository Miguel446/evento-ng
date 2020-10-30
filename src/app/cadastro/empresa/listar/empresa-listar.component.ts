import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { EmpresaService } from '../../../shared/services/cadastro/empresa.service';
import { Empresa } from '../../../shared/models/empresa.model';

import { ConfirmarDialog } from '../../../shared/dialogs/remover.dialog';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.css']
})
export class EmpresaListarComponent implements OnInit {

  dataSource: MatTableDataSource<Empresa>;
  colunas: string[] = ['nomeFantasia', 'razaoSocial', 'cidade', 'categoria', 'acao'];

  constructor(
    private router: Router,
    private service: EmpresaService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  form() {
    this.router.navigate(['/cadastro/empresa/form']);
  }

  listar() {
    this.service.listar().subscribe(
      data => {
        const empresas = data as Empresa[];
        this.dataSource = new MatTableDataSource<Empresa>(empresas);
      },
      e => {
        this.errorAlert(e);
      }
    );
  }

  removerDialog(id: string) {
    console.log(id);
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
