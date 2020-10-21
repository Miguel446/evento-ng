import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/evento']);
  }
}
