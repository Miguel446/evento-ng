import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { CategoriaService } from '../../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../../shared/services/cadastro/empresa.service';

import { Categoria } from '../../shared/models/categoria.model';
import { Empresa } from '../../shared/models/empresa.model';

@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.component.html',
  styleUrls: ['./planilha.component.css']
})
export class PlanilhaComponent implements OnInit {

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;

  categoriaId: number;
  empresaId: number;

  categorias: Categoria[];

  empresasFiltradas: Observable<Empresa[]>;
  empresas: Empresa[];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.listarCategorias();
    this.listarEmpresas();
  }

  gerarForm() {
    this.form = this.fb.group({
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      empresa: ['', [Validators.required]],
      file: ['', [Validators.required]],
      cep: ['', [Validators.required]],
    });
  }

  upload() {

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

  listarEmpresas() {
    this.empresaService.listar().subscribe(
      data => {
        this.empresas = data as Empresa[];

        this.empresasFiltradas = this.form.get('empresa').valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterEmpresa(value))
          );
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  empresaSelecionada(event: any) {
    this.empresaId = event.option.id;
  }

  private _filterEmpresa(value: any): Empresa[] {
    const filterValue = value.toLowerCase();
    return this.empresas.filter(empresa => empresa.nomeFantasia.toLowerCase().includes(filterValue));
  }

  voltar() {
    this.router.navigate(['/']);
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
