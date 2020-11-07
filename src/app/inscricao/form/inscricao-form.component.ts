import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Inscricao } from '../../shared/models/inscricao.model'
import { Evento } from '../../shared/models/evento.model';
import { Empresa } from '../../shared/models/empresa.model';
import { Categoria } from '../../shared/models/categoria.model';
import { Participante } from '../../shared/models/participante.model';

import { InscricaoService } from '../../shared/services/inscricao/inscricao.service';
import { CategoriaService } from '../../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../../shared/services/cadastro/empresa.service';
import { EventoService } from '../../shared/services/cadastro/evento.service';
import { ParticipanteService } from '../../shared/services/cadastro/participante.service';

import { CepService } from '../../shared/services/utils/cep.service';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.css']
})
export class InscricaoFormComponent implements OnInit {

  form: FormGroup;

  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  formParticipante: FormGroup;

  inscricaoId: string;
  eventoId: number;

  categoriaId: number;
  empresaId: number;

  eventosFiltrados: Observable<Evento[]>;
  eventos: Evento[];

  empresasFiltradas: Observable<Empresa[]>;
  empresas: Empresa[];

  categorias: Categoria[];

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: InscricaoService,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,
    private eventoService: EventoService,
    private participanteService: ParticipanteService,
    private cepService: CepService) { }

  ngOnInit(): void {
    this.inscricaoId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();
    this.gerarFormParticipante();

    if (this.inscricaoId != null) {
      this.buscarInscricao();
    }

    this.listarEventos();
    this.listarCategorias();
    this.listarEmpresas();
  }

  gerarForm() {
    this.form = this.fb.group({
      evento: ['', [Validators.required]],
      id: [this.inscricaoId]
    });
  }

  gerarFormParticipante() {
    this.formParticipante = this.fb.group({
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
      id: ['']
    });
  }

  buscarInscricao() {
    this.service.buscar(Number(this.inscricaoId)).subscribe(
      data => {
        const i = data as Inscricao;
        this.form.get('id').setValue(i.id);
        this.form.get('evento').setValue(i?.evento?.nome);
        this.eventoId = i?.evento?.id;

        this.configurarParticipante(i.participante);
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  salvar() {
    const nomeEvento = this.form.get('evento').value;
    let arrayEvento: Evento[] = this.eventos.filter(e => e.nome == nomeEvento && e.id == this.eventoId);
    if (arrayEvento.length != 1) {
      return this.snackbar.open('Por favor, selecione o evento desejado na lista sugerida de eventos', 'Erro', { duration: 3000 });
    }

    const nomeEmpresa = this.formParticipante.get('empresa').value;
    let arrayEmpresa: Empresa[] = this.empresas.filter(e => e.nomeFantasia == nomeEmpresa && e.id == this.empresaId);
    if (arrayEmpresa.length != 1) {
      return this.snackbar.open('Por favor, selecione a empresa desejada na lista sugerida de empresas', 'Erro', { duration: 3000 });
    }

    const participante: Participante = this.formParticipante.value;
    participante.empresa = new Empresa(this.empresaId);
    participante.categoria = new Categoria(this.categoriaId);

    let inscricao: Inscricao = this.form.value;
    inscricao.participante = participante;
    inscricao.evento = new Evento(this.eventoId);

    return console.log(inscricao);
    this.service.cadastrar(inscricao).subscribe(
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
        this.empresasFiltradas = this.formParticipante.get('empresa').valueChanges
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


  listarEventos() {
    this.eventoService.listar().subscribe(
      data => {
        this.eventos = data as Evento[];
        this.eventosFiltrados = this.form.get('evento').valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterEvento(value))
          );
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  buscarParticipante() {
    const cpf = this.formParticipante.get('cpf').value;
    if (cpf == '000.000.000-00') {
      return false;
    }

    this.participanteService.buscarPorCpf(cpf).subscribe(
      data => {
        const p = data as Participante;
        this.configurarParticipante(p);
      },
      e => {
        this.erroAlert(e);

        this.formParticipante.reset();
        this.formParticipante.get('cpf').setValue(cpf);
        this.categoriaId = null;
        this.empresaId = null;
      }
    );
  }

  private configurarParticipante(p: Participante) {
    this.formParticipante.get('cpf').setValue(p.cpf);
    this.formParticipante.get('nome').setValue(p.nome);
    this.formParticipante.get('cracha').setValue(p.cracha);
    this.formParticipante.get('cep').setValue(p.cep);
    this.formParticipante.get('endereco').setValue(p.endereco);
    this.formParticipante.get('bairro').setValue(p.bairro);
    this.formParticipante.get('cidade').setValue(p.cidade);
    this.formParticipante.get('estado').setValue(p.estado);
    this.formParticipante.get('categoria').setValue(p?.categoria.id);
    this.formParticipante.get('empresa').setValue(p?.empresa.nomeFantasia);
    this.formParticipante.get('id').setValue(p.id);

    this.categoriaId = p?.categoria.id;
    this.empresaId = p?.empresa.id;
  }

  configurarEndereco() {
    const cep = this.formParticipante.get('cep').value;
    this.cepService.buscar(cep).subscribe(
      data => {
        if (data.erro) {
          return this.limparEndereco('CEP não encontrado');;
        }
        this.formParticipante.get('cep').setValue(data.cep);
        this.formParticipante.get('endereco').setValue(data.logradouro);
        this.formParticipante.get('bairro').setValue(data.bairro);
        this.formParticipante.get('cidade').setValue(data.localidade);
        this.formParticipante.get('estado').setValue(data.uf);
      },
      e => {
        this.limparEndereco('Erro ao buscar CEP');
      }
    );
  }

  limparEndereco(msg: string) {
    this.formParticipante.get('endereco').setValue('');
    this.formParticipante.get('bairro').setValue('');
    this.formParticipante.get('cidade').setValue('');
    this.formParticipante.get('estado').setValue('');
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

  eventoSelecionado(event: any) {
    this.eventoId = event.option.id;
  }

  empresaSelecionada(event: any) {
    this.empresaId = event.option.id;
  }

  voltar() {
    this.router.navigate(['/']);
  }

  private _filterEvento(value: any): Evento[] {
    const filterValue = value.toLowerCase();
    return this.eventos.filter(evento => evento.nome.toLowerCase().includes(filterValue));
  }

  private _filterEmpresa(value: any): Empresa[] {
    const filterValue = value.toLowerCase();
    return this.empresas.filter(empresa => empresa.nomeFantasia.toLowerCase().includes(filterValue));
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
