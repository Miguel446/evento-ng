import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Empresa } from '../../../shared/models/empresa.model';

import { EmpresaService } from '../../../shared/services/cadastro/empresa.service';
import { Categoria } from 'src/app/shared/models/categoria.model';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  form: FormGroup;
  empresaId: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private service: EmpresaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('id');
    if (this.empresaId != null) {
      this.buscar();
    } else {
      this.gerarForm();
    }
  }

  // TODO verificar como configurar categoria

  gerarForm() {
    this.form = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.minLength(3)]],
      cep: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      id: [this.empresaId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.empresaId)).subscribe(
      data => {
        this.form = this.fb.group({
          razaoSocial: [data.razaoSocial, [Validators.required, Validators.minLength(3)]],
          nomeFantasia: [data.nomeFantasia, [Validators.required, Validators.minLength(3)]],
          cnpj: [data.cnpj, [Validators.required, Validators.minLength(3)]],
          cep: [data.cep, [Validators.required]],
          endereco: [data.endereco, [Validators.required]],
          bairro: [data.bairro, [Validators.required]],
          cidade: [data.cidade, [Validators.required]],
          estado: [data.estado, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
          id: [this.empresaId]
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

    var empresa: Empresa = this.form.value;
    empresa.categoria = new Categoria(153);
    this.service.cadastrar(empresa).subscribe(
      data => {
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
    this.router.navigate(['/cadastro/empresa']);
  }

}
