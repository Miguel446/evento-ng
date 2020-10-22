import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forma-pagamento-form',
  templateUrl: './forma-pagamento-form.component.html',
  styleUrls: ['./forma-pagamento-form.component.css']
})
export class FormaPagamentoFormComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/forma-pagamento']);
  }

  salvar() {
    this.snackbar.open('Adicionar mensagem aqui', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    this.voltar();
  }

}
