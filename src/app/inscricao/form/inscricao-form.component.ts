import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.css']
})
export class InscricaoFormComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/']);
  }

  salvar() {
    this.snackbar.open('Adicionar mensagem aqui', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    // limpar form
  }

  myControl = new FormControl();
  options: string[] = ['SuperNorte', 'BoatShow', 'JetLounge'];

}
