import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';

import { Participante } from '../../../shared/models/participante.model';
import { Categoria } from '../../../shared/models/categoria.model';
import { Empresa } from '../../../shared/models/empresa.model';

import { ParticipanteService } from '../../../shared/services/cadastro/participante.service';
import { CategoriaService } from '../../../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../../../shared/services/cadastro/empresa.service';


@Component({
  selector: 'app-participante-form',
  templateUrl: './participante-form.component.html',
  styleUrls: ['./participante-form.component.css']
})
export class ParticipanteFormComponent implements OnInit {

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  form: FormGroup;
  participanteId: string;
  categoriaId: string;
  empresaId: string;

  categorias: Categoria[];
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
        console.log(p.cpf);
        this.form.get('nome').setValue(p.nome);
        this.form.get('cracha').setValue(p.cracha);
        this.form.get('cpf').setValue(p.cpf);
        this.form.get('cep').setValue(p.cep);
        this.form.get('endereco').setValue(p.endereco);
        this.form.get('bairro').setValue(p.bairro);
        this.form.get('cidade').setValue(p.cidade);
        this.form.get('estado').setValue(p.estado);
        this.form.get('categoria').setValue(p?.categoria?.id);
        this.form.get('empresa').setValue(p?.empresa?.id);

        this.empresaId = data?.empresa?.id;
        this.categoriaId = data?.categoria?.id;
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

    let participante: Participante = this.form.value;
    participante.empresa = new Empresa(Number(this.empresaId));
    participante.categoria = new Categoria(Number(this.categoriaId));

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
      },
      e => {
        this.erroAlert(e);
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
