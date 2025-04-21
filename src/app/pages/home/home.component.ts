import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../core/services/note/note.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { INote } from '../../core/interfaces/inote';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private readonly noteService = inject(NoteService)
  private readonly toastrService = inject(ToastrService)

  text:string = "";


  private readonly formBuilder = inject( FormBuilder )
  
  addNoteForm:FormGroup = this.formBuilder.group({
    title:[null, [Validators.required]],
    content:[null, [Validators.required]]
  },)
  
  updateNoteForm:FormGroup = this.formBuilder.group({
    _id:[null],
    title:[null, [Validators.required]],
    content:[null, [Validators.required]]
  },)

  // === 

  addNote(){
    this.noteService.addNote(this.addNoteForm.value).subscribe({
      next:(res)=>{
        this.addNoteForm.reset()
        // console.log(res);
        this.toastrService.success("The note was added successfully")
        this.getUserNote();
      },error:(err)=>{
        console.log(err);
        this.toastrService.error(err.error.msg)
      }
    })
  }

  
  // ===

  notesList:INote[] = [];

  ngOnInit(): void {
    this.getUserNote();
  }

  getUserNote(){
    this.noteService.getUserNotes().subscribe({
      next:(res)=>{
        // console.log(res);
        this.notesList = res.notes
        // console.log(this.notesList);
        
      },error:(err)=>{
        this.notesList = []
        // console.log(err);
      }
    })
  }


  // ===

  
  updateNote() {

    const {_id, title, content} = this.updateNoteForm.value

    this.noteService.updeteNote(_id, {title, content}).subscribe({
      next:(res)=>{
        // console.log(res);
        this.getUserNote();
        this.toastrService.success("The note was updated successfully")
      },error:(err)=>{
        // console.log(err);
      }
    })

  }

  patchValue(nota:any){
    this.updateNoteForm.patchValue(nota)
  }

  // ===

  deleteNote(id:any) {

    this.noteService.deleteNote(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.getUserNote();
        this.toastrService.success("The note was deleted successfully")
      },error:(err)=>{
        // console.log(err);
      }
      
    })

  }

}