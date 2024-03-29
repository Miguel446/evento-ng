import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Participante } from '../../../shared/models/participante.model';
import { Categoria } from '../../../shared/models/categoria.model';
import { Empresa } from '../../../shared/models/empresa.model';

import { ParticipanteService } from '../../../shared/services/cadastro/participante.service';
import { CategoriaService } from '../../../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../../../shared/services/cadastro/empresa.service';

import { CepService } from '../../../shared/services/utils/cep.service';

@Component({
  selector: 'app-participante-form',
  templateUrl: './participante-form.component.html',
  styleUrls: ['./participante-form.component.css']
})
export class ParticipanteFormComponent implements OnInit {

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;
  participanteId: string;
  categoriaId: number;
  empresaId: number;

  categorias: Categoria[];

  empresasFiltradas: Observable<Empresa[]>;
  empresas: Empresa[];

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private service: ParticipanteService,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    this.participanteId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();

    if (this.participanteId != null) {
      this.buscar();
    }

    this.listarCategorias();
    this.listarEmpresas();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cracha: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(this.cpfmask.length)]],
      cep: ['', [Validators.required, Validators.minLength(this.cepmask.length)]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      categoria: ['', Validators.required],
      empresa: ['', Validators.required],
      id: [this.participanteId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.participanteId)).subscribe(
      data => {
        const p = data as Participante;
        this.form.get('nome').setValue(p.nome);
        this.form.get('cracha').setValue(p.cracha);
        this.form.get('cpf').setValue(p.cpf);
        this.form.get('cep').setValue(p.cep);
        this.form.get('endereco').setValue(p.endereco);
        this.form.get('bairro').setValue(p.bairro);
        this.form.get('cidade').setValue(p.cidade);
        this.form.get('estado').setValue(p.estado);
        this.form.get('categoria').setValue(p?.categoria?.id);
        this.form.get('empresa').setValue(p?.empresa?.nomeFantasia);

        this.empresaId = data?.empresa?.id;
        this.categoriaId = data?.categoria?.id;
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  salvar() {
    const nomeEmpresa = this.form.get('empresa').value;
    let array: Empresa[] = this.empresas.filter(e => e.nomeFantasia == nomeEmpresa && e.id == this.empresaId);
    if (array.length != 1) {
      return this.snackbar.open('Por favor, selecione a empresa desejada na lista sugerida de empresas', 'Erro', { duration: 3000 });
    }

    let participante: Participante = this.form.value;
    participante.empresa = new Empresa(this.empresaId);
    participante.categoria = new Categoria(this.categoriaId);

    this.service.cadastrar(participante).subscribe(
      data => {
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

  private _filterEmpresa(value: any): Empresa[] {
    const filterValue = value.toLowerCase();
    return this.empresas.filter(empresa => empresa.nomeFantasia.toLowerCase().includes(filterValue));
  }

  empresaSelecionada(event: any) {
    this.empresaId = event.option.id;
  }

  buscarEndereco() {
    const cep = this.form.get('cep').value;
    this.cepService.buscar(cep).subscribe(
      data => {
        if (data.erro) {
          this.cepService.limpar(this.form);
          return this.snackbar.open('CEP não encontrado', 'Erro', { duration: 3000 });
        }
        this.cepService.carregar(data, this.form);
      },
      e => {
        this.cepService.limpar(this.form);
        this.snackbar.open('Não foi possível buscar o CEP', 'Erro', { duration: 3000 });
      }
    );
  }

  voltar() {
    this.router.navigate(['/cadastro/participante']);
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }
}
