import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/evento']);
  }

  salvar() {
    this.snackbar.open('Adicionar mensagem aqui', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    this.voltar();
  }
}
