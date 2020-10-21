import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participante-form',
  templateUrl: './participante-form.component.html',
  styleUrls: ['./participante-form.component.css']
})
export class ParticipanteFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/participante']);
  }
}
