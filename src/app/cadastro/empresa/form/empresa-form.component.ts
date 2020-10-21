import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  voltar() {
    this.router.navigate(['/cadastro/empresa']);
  }

}
