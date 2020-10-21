import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  inicio() {
    this.router.navigate(['/']);
  }

  participante() {
    this.router.navigate(['/cadastro/participante']);
  }

  evento() {
    this.router.navigate(['/cadastro/evento']);
  }

  forma_pagamento() {
    this.router.navigate(['/cadastro/forma-pagamento']);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
