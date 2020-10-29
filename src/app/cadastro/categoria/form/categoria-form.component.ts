import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../shared/models/categoria.model';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  form: FormGroup;
  categoriaId: number;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('categoriaId'));
    console.log(this.categoriaId);
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required], Validators.minLength(3)]
    });
  }

  voltar() {
    this.router.navigate(['/cadastro/categoria']);
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }

    var categoria: Categoria = this.form.value;
    categoria.id = 1;
    console.log(categoria);

    this.snackbar.open('Cadastro concluído!', 'Sucesso', {
      duration: 3000,
      panelClass: ['ok'], // para msg de erro, remover essa linha
    });
    this.voltar();
  }

}
