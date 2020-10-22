import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-participante-form',
  templateUrl: './participante-form.component.html',
  styleUrls: ['./participante-form.component.css']
})
export class ParticipanteFormComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/participante']);
  }

  salvar() {
    this.snackbar.open('Adicionar mensagem aqui', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    this.voltar();
  }
}
