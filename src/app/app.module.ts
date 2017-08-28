import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from 'ng2-ckeditor';
import { MdCheckboxModule } from '@angular/material';


import { PortfolioService } from './services/portfolio.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { OnlyCheckedPipe } from './pipes/only-checked.pipe';
import { CompetencesInformatiquePipe } from './pipes/competences-informatique.pipe';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ListCompetenceInformatiqueComponent } from './content/list-competence-informatique/list-competence-informatique.component';
import { CompetenceInformatiqueFormComponent } from './add/competence-informatique-form/competence-informatique-form.component';
import { CompetenceTypeComponent } from './add/competence-type/competence-type.component';
import { CompetenceInformatiqueComponent } from './content/competence-informatique/competence-informatique.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AddFormationComponent } from './add/add-formation/add-formation.component';
import { MessagesComponent } from './messages/messages.component';
import { AddLanguesComponent } from './add/add-langues/add-langues.component';
import { AddExperiencesProfessionnellesComponent } from './add/add-experiences-professionnelles/add-experiences-professionnelles.component';
import { AddBasicPageComponent } from './add/add-basic-page/add-basic-page.component';
import { ListExperienceProfessionnelleComponent } from './content/list-experience-professionnelle/list-experience-professionnelle.component';
import { ListEtudesFormationsComponent } from './content/list-etudes-formations/list-etudes-formations.component';
import { AuthenticationComponent } from './authentication/authentication.component';


const appRoutes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'logout', component: AuthenticationComponent },

  {
    path: 'list-competences-informatique',
    component: ListCompetenceInformatiqueComponent    
  },
  {
    path: 'list-langage-informatique',
    component: ListCompetenceInformatiqueComponent    
  },
  {
    path: 'list-experiences-professionnelles',
    component: ListExperienceProfessionnelleComponent    
  },
  {
    path: 'list-etudes-formations',
    component: ListEtudesFormationsComponent    
  },

  { path: 'popup', component: PopUpComponent },

  { path: 'competence-informatique/:id', component: CompetenceInformatiqueComponent, data: { preload: true } },

  {
    path: 'add-competence-informatique',
    component: CompetenceInformatiqueFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-competence-type',
    component: CompetenceTypeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-formation',
    component: AddFormationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-langue',
    component: AddLanguesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-experience',
    component: AddExperiencesProfessionnellesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'add-basic-page',
    component: AddBasicPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ListCompetenceInformatiqueComponent,
    PageNotFoundComponent,
    HomeComponent,
    CompetenceInformatiqueFormComponent,
    CompetenceTypeComponent,
    CompetenceInformatiqueComponent,
    PopUpComponent,
    AddFormationComponent,
    MessagesComponent,
    AddLanguesComponent,
    AddExperiencesProfessionnellesComponent,
    AddBasicPageComponent,
    ListExperienceProfessionnelleComponent,
    OnlyCheckedPipe,
    CompetencesInformatiquePipe,
    ListEtudesFormationsComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    MdCheckboxModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PortfolioService, PopUpComponent, MessagesComponent, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
