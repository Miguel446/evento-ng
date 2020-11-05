import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Inscricao } from '../../shared/models/inscricao'
import { Evento } from '../../shared/models/evento.model';
import { Empresa } from '../../shared/models/empresa.model';
import { Categoria } from '../../shared/models/categoria.model';

import { InscricaoServiceService } from '../../shared/services/inscricao/inscricao-service.service';
import { CategoriaService } from '../../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../../shared/services/cadastro/empresa.service';
import { Participante } from 'src/app/shared/models/participante.model';

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

  eventosFiltrados: Observable<string[]>;
  // TODO buscar eventos no backend
  eventos: any[] = [{ "id": '1', "nome": 'SuperNorte' }, { "id": '2', "nome": 'BoatShow' }, { "id": '3', "nome": 'JetLounge' }];

  categorias: Categoria[];
  empresas: Empresa[];

  cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: InscricaoServiceService,
    private categoriaService: CategoriaService,
    private empresaService: EmpresaService,) { }

  ngOnInit(): void {
    this.inscricaoId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();
    this.gerarFormParticipante();

    if (this.inscricaoId != null) {
      this.buscar();
    }

    this.eventosFiltrados = this.form.get('evento').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

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

  buscar() {
    this.service.buscar(Number(this.inscricaoId)).subscribe(
      data => {
        const i = data as Inscricao;
        this.form.get('id').setValue(i.id);
        this.form.get('evento').setValue(i?.evento?.nome);
        this.eventoId = i?.evento?.id;

        this.formParticipante.get('nome').setValue(i.participante.nome);
        this.formParticipante.get('cracha').setValue(i.participante.cracha);
        this.formParticipante.get('cpf').setValue(i.participante.cpf);
        this.formParticipante.get('cep').setValue(i.participante.cep);
        this.formParticipante.get('endereco').setValue(i.participante.endereco);
        this.formParticipante.get('bairro').setValue(i.participante.bairro);
        this.formParticipante.get('cidade').setValue(i.participante.cidade);
        this.formParticipante.get('estado').setValue(i.participante.estado);
        this.formParticipante.get('id').setValue(i?.participante?.id);

        this.categoriaId = i?.participante?.categoria?.id;
        this.empresaId = i?.participante?.empresa?.id;
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  salvar() {
    // TODO validar se evento foi selecionado
    // return alert(this.form.value);
    if (this.form.invalid) {
      return;
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
      },
      e => {
        this.erroAlert(e);
      }
    );
  }

  voltar() {
    this.router.navigate(['/']);
  }

  optionSelected(event: any) {
    this.eventoId = event.option.id;
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.eventos.filter(evento => evento.nome.toLowerCase().includes(filterValue));
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
