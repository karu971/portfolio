import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ListCompetenceInformatiqueComponent } from './list-competence-informatique/list-competence-informatique.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { PortfolioService } from './services/portfolio.service';
import { CompetencePipe } from './pipes/competence.pipe';
import { CompetenceInformatiqueFormComponent } from './add/competence-informatique-form/competence-informatique-form.component';
import { CompetenceTypeComponent } from './add/competence-type/competence-type.component';
import { CompetenceInformatiqueComponent } from './content/competence-informatique/competence-informatique.component';
import { Feature } from "./feature";


const appRoutes = [

  { path: 'home', component: HomeComponent },
  { path: 'list-competences-informatique', component: ListCompetenceInformatiqueComponent },

  { path: 'competence-informatique/:id', component: CompetenceInformatiqueComponent, data: { preload: true } },  

  { path: 'add-competence-informatique', component: CompetenceInformatiqueFormComponent },
  { path: 'add-competence-type', component: CompetenceTypeComponent },
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
    CompetencePipe,
    CompetenceInformatiqueFormComponent,
    CompetenceTypeComponent,
    CompetenceInformatiqueComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PortfolioService,Feature],
  bootstrap: [AppComponent]
})
export class AppModule { }
