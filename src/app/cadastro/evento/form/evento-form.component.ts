import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Evento } from '../../../shared/models/evento.model';
import { EventoService } from '../../../shared/services/cadastro/evento.service';


@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  form: FormGroup;
  eventoId: string;

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: EventoService) { }

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('id');
    this.gerarForm();

    if (this.eventoId != null) {
      this.buscar();
    }
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', [Validators.required, Validators.minLength(3)]],
      dataInicial: ['', [Validators.required, Validators.minLength(3)]],
      dataFinal: ['', [Validators.required, Validators.minLength(3)]],
      id: [this.eventoId]
    });
  }

  buscar() {
    this.service.buscar(Number(this.eventoId)).subscribe(
      data => {
        const e = data as Evento;
        this.form.get('nome').setValue(e.nome);
        this.form.get('local').setValue(e.local);
        this.form.get('dataInicial').setValue(e.dataInicial);
        this.form.get('dataFinal').setValue(e.dataFinal);
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

    const evento: Evento = this.form.value;
    //return console.log(evento);

    this.service.cadastrar(evento).subscribe(
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
    this.router.navigate(['/cadastro/evento']);
  }

  private erroAlert(e: any) {
    let msg: string = "Tente novamente em instantes.";
    if (e.status != 0) {
      msg = e.error.msg;
    }
    this.snackbar.open(msg, 'Erro', { duration: 3000 });
  }
}
