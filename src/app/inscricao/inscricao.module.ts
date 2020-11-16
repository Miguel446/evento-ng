import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TextMaskModule } from 'angular2-text-mask';

import { CadastroModule } from '../cadastro/cadastro.module';

import { InscricaoFormComponent } from './form/inscricao-form.component';
import { InscricaoService } from '../shared/services/inscricao/inscricao.service';
import { CategoriaService } from '../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../shared/services/cadastro/empresa.service';
import { EventoService } from '../shared/services/cadastro/evento.service';
import { ParticipanteService } from '../shared/services/cadastro/participante.service';

import { CepService } from '../shared/services/utils/cep.service';
import { InscricaoListarComponent } from './listar/inscricao-listar.component';

import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';
import { PlanilhaComponent } from './planilha/planilha.component';

@NgModule({
  declarations: [
    InscricaoFormComponent,
    InscricaoListarComponent,
    PlanilhaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatBadgeModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatPaginatorModule,
    TextMaskModule,
    CadastroModule
  ],
  providers: [
    InscricaoService,
    CategoriaService,
    EmpresaService,
    EventoService,
    ParticipanteService,
    CepService,
    MatPaginatorIntl,
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
  ]
})
export class InscricaoModule { }
