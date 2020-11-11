import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';

import { Empresa } from '../../../shared/models/empresa.model';

import { EmpresaService } from '../../../shared/services/cadastro/empresa.service';
import { CategoriaService } from '../../../shared/services/cadastro/categoria.service';
import { Categoria } from 'src/app/shared/models/categoria.model';

import { CepService } from '../../../shared/services/utils/cep.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;
  empresaId: string;
  categoriaId: number;

  categorias: Categoria[];

  cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  empresa: Empresa;
  isDialog: boolean = false;
  width: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: EmpresaService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.empresaId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();

    if (!this.route.snapshot.routeConfig) {
      this.isDialog = true;
    }
    this.width = this.isDialog ? '100' : '80';

    if (this.empresaId != null) {
      this.buscar();
    }

    this.listarCategorias();
  }


  gerarForm() {
    this.form = this.fb.group({
      razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.minLength(this.cnpjmask.length)]],
      cep: ['', [Validators.required, Validators.minLength(this.cepmask.length)]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      categoria: ['', Validators.required],
      id: [this.empresaId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.empresaId)).subscribe(
      data => {
        const e = data as Empresa;
        this.form.get('nomeFantasia').setValue(e.nomeFantasia);
        this.form.get('razaoSocial').setValue(e.razaoSocial);
        this.form.get('cnpj').setValue(e.cnpj);
        this.form.get('cep').setValue(e.cep);
        this.form.get('endereco').setValue(e.endereco);
        this.form.get('bairro').setValue(e.bairro);
        this.form.get('cidade').setValue(e.cidade);
        this.form.get('estado').setValue(e.estado);
        this.form.get('categoria').setValue(e?.categoria?.id);

        this.categoriaId = data.categoria.id;
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }

    this.empresa = this.form.value as Empresa;
    this.empresa.categoria = new Categoria(this.categoriaId);
    this.service.cadastrar(this.empresa).subscribe(
      data => {
        this.empresa = data as Empresa;
        this.snackbar.open('Cadastro concluído!', 'Sucesso', {
          duration: 3000,
          panelClass: ['ok'],
        });

        this.voltar();
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  listarCategorias() {
    this.categoriaService.listar().subscribe(
      data => {
        this.categorias = data as Categoria[];
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  configurarEndereco() {
    const cep = this.form.get('cep').value;
    this.cepService.buscar(cep).subscribe(
      data => {
        if (data.erro) {
          return this.limparEndereco('CEP não encontrado');;
        }
        this.form.get('cep').setValue(data.cep);
        this.form.get('endereco').setValue(data.logradouro);
        this.form.get('bairro').setValue(data.bairro);
        this.form.get('cidade').setValue(data.localidade);
        this.form.get('estado').setValue(data.uf);
      },
      e => {
        this.limparEndereco('Erro ao buscar CEP');
      }
    );
  }

  limparEndereco(msg: string) {
    this.form.get('endereco').setValue('');
    this.form.get('bairro').setValue('');
    this.form.get('cidade').setValue('');
    this.form.get('estado').setValue('');
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

  voltar() {
    if (this.isDialog) {
      return this.dialog.closeAll();
    }
    this.router.navigate(['/cadastro/empresa']);
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
