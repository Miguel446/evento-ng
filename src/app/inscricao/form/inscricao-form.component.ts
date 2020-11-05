import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Inscricao } from '../../shared/models/inscricao';
import { InscricaoServiceService } from '../../shared/services/inscricao/inscricao-service.service';

@Component({
  selector: 'app-inscricao-form',
  templateUrl: './inscricao-form.component.html',
  styleUrls: ['./inscricao-form.component.css']
})
export class InscricaoFormComponent implements OnInit {

  form: FormGroup;
  inscricaoId: string;

  filteredOptions: Observable<string[]>;
  options: string[] = ['SuperNorte', 'BoatShow', 'JetLounge'];

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: InscricaoServiceService) { }

  ngOnInit(): void {
    this.inscricaoId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();

    if (this.inscricaoId != null) {
      this.buscar();
    }

    this.filteredOptions = this.form.get('evento').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  gerarForm() {
    this.form = this.fb.group({
      evento: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      participante: ['', [Validators.required]],
      id: [this.inscricaoId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.inscricaoId)).subscribe(
      data => {
        const i = data as Inscricao;
        this.form.get('evento').setValue(i?.evento?.nome);
        this.form.get('empresa').setValue(i?.participante?.empresa?.nomeFantasia);
        this.form.get('participante').setValue(i?.participante?.nome);
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

    const inscricao: Inscricao = this.form.value;

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

  voltar() {
    this.router.navigate(['/']);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }

}
