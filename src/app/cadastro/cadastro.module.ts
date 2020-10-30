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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { ParticipanteFormComponent } from './participante/form/participante-form.component';
import { ParticipanteListarComponent } from './participante/listar/participante-listar.component';
import { FormaPagamentoFormComponent } from './forma-pagamento/form/forma-pagamento-form.component';
import { FormaPagamentoListarComponent } from './forma-pagamento/listar/forma-pagamento-listar.component';
import { EventoListarComponent } from './evento/listar/evento-listar.component';
import { EventoFormComponent } from './evento/form/evento-form.component';
import { EmpresaListarComponent } from './empresa/listar/empresa-listar.component';
import { EmpresaFormComponent } from './empresa/form/empresa-form.component';
import { CategoriaFormComponent } from './categoria/form/categoria-form.component';
import { CategoriaListarComponent } from './categoria/listar/categoria-listar.component';

import { CategoriaService } from '../shared/services/cadastro/categoria.service';
import { EmpresaService } from '../shared/services/cadastro/empresa.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ParticipanteFormComponent,
    ParticipanteListarComponent,
    FormaPagamentoFormComponent,
    FormaPagamentoListarComponent,
    EventoListarComponent,
    EventoFormComponent,
    EmpresaListarComponent,
    EmpresaFormComponent,
    CategoriaFormComponent,
    CategoriaListarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    SharedModule,
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
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    CategoriaService,
    EmpresaService
  ]
})
export class CadastroModule { }
