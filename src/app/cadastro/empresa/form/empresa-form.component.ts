import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/empresa']);
  }

  salvar() {
    this.snackbar.open('Adicionar mensagem aqui', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    this.voltar();
  }

}
