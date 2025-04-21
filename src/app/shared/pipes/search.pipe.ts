import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../../core/interfaces/inote';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allNotes:INote[], term:string): INote[] {
    return allNotes.filter( (item)=> item.title.toLowerCase().includes(term.toLowerCase())  );
  }

}
