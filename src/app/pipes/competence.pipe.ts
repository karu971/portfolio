import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'competence'
})
export class CompetencePipe implements PipeTransform {

  // transform(value: any, typeCompetence: any): any {
  //   if(value.type === typeCompetence.id){
  //     return value.title;
  //   }
  // }
  transform(value: any, typeCompetence: any): any {

     return value
  } 

}
