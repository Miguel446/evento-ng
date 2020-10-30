import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../../shared/models/categoria.model';

import { CategoriaService } from '../../../shared/services/cadastro/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  form: FormGroup;
  categoriaId: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.paramMap.get('id');
    if (this.categoriaId != null) {
      this.buscar();
    } else {
      this.gerarForm();
    }
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      id: [this.categoriaId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.categoriaId)).subscribe(
      data => {
        this.form = this.fb.group({
          nome: [data.nome, [Validators.required, Validators.minLength(3)]],
          id: [data.id]
        });
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

  salvar() {
    if (this.form.invalid) {
      return;
    }

    const categoria: Categoria = this.form.value;

    this.service.cadastrar(categoria).subscribe(
      response => {
        this.snackbar.open('Cadastro concluído!', 'Sucesso', {
          duration: 3000,
          panelClass: ['ok'],
        });

        this.voltar();
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

  voltar() {
    this.router.navigate(['/cadastro/categoria']);
  }

}
