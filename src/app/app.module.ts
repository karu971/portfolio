import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ListCompetenceInformatiqueComponent } from './content/list-competence-informatique/list-competence-informatique.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { MdCheckboxModule } from '@angular/material';


import { PortfolioService } from './services/portfolio.service';
import { CompetenceInformatiqueFormComponent } from './add/competence-informatique-form/competence-informatique-form.component';
import { CompetenceTypeComponent } from './add/competence-type/competence-type.component';
import { CompetenceInformatiqueComponent } from './content/competence-informatique/competence-informatique.component';
import { Feature } from "./feature";
import { PopUpComponent } from './pop-up/pop-up.component';
import { AddFormationComponent } from './add/add-formation/add-formation.component';
import { MessagesComponent } from './messages/messages.component';
import { AddLanguesComponent } from './add/add-langues/add-langues.component';
import { AddExperiencesProfessionnellesComponent } from './add/add-experiences-professionnelles/add-experiences-professionnelles.component';
import { AddBasicPageComponent } from './add/add-basic-page/add-basic-page.component';
import { ListExperienceProfessionnelleComponent } from './content/list-experience-professionnelle/list-experience-professionnelle.component';
import { OnlyCheckedPipe } from './pipes/only-checked.pipe';
import { CompetencesInformatiquePipe } from './pipes/competences-informatique.pipe';
import { ListEtudesFormationsComponent } from './content/list-etudes-formations/list-etudes-formations.component';


const appRoutes = [

  { path: 'home', component: HomeComponent },

  { path: 'list-competences-informatique', component: ListCompetenceInformatiqueComponent },
  { path: 'list-langage-informatique', component: ListCompetenceInformatiqueComponent },
  { path: 'list-experiences-professionnelles', component: ListExperienceProfessionnelleComponent },
  { path: 'list-etudes-formations', component: ListEtudesFormationsComponent },

  { path: 'popup', component: PopUpComponent },

  { path: 'competence-informatique/:id', component: CompetenceInformatiqueComponent, data: { preload: true } },

  { path: 'add-competence-informatique', component: CompetenceInformatiqueFormComponent },
  { path: 'add-competence-type', component: CompetenceTypeComponent },
  { path: 'add-formation', component: AddFormationComponent },
  { path: 'add-langue', component: AddLanguesComponent },
  { path: 'add-experience', component: AddExperiencesProfessionnellesComponent },
  { path: 'add-basic-page', component: AddBasicPageComponent },
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
    ListEtudesFormationsComponent
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
  providers: [PortfolioService, Feature, PopUpComponent, MessagesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
