import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'competencesInformatique'
})
export class CompetencesInformatiquePipe implements PipeTransform {

  competenceInformatique: any = [];

  transform(value: any, typeCompetence: string, nbElementAfficher: string = 'all'): any {

    if (value) {
      for (const item of value) {
        if (item.type == typeCompetence) {
          this.competenceInformatique = [...this.competenceInformatique, item];
        }
      }
      if (nbElementAfficher != 'all'){
        this.competenceInformatique = this.competenceInformatique.slice(0, nbElementAfficher);
      }
    }

    return this.competenceInformatique;
  }

}
