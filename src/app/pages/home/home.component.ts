import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NoteService } from '../../core/services/note/note.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { INote } from '../../core/interfaces/inote';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly noteService = inject(NoteService);
  private readonly toastrService = inject(ToastrService);

  private readonly formBuilder = inject(FormBuilder);

  addSubscription: Subscription = new Subscription();
  getSubscription: Subscription = new Subscription();
  updateSubscription: Subscription = new Subscription();
  deleteSubscription: Subscription = new Subscription();

  text: string = '';

  notesList: INote[] = [];

  ngOnInit(): void {
    this.getUserNote();
  }

  addNoteForm: FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  updateNoteForm: FormGroup = this.formBuilder.group({
    _id: [null],
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  });

  // ===

  addNote() {
    this.addSubscription = this.noteService
      .addNote(this.addNoteForm.value)
      .subscribe({
        next: (res) => {
          this.addNoteForm.reset();
          // console.log(res);
          this.toastrService.success('The note was added successfully');
          this.getUserNote();
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error.msg);
        },
      });
  }

  // ===

  getUserNote() {
    this.getSubscription = this.noteService.getUserNotes().subscribe({
      next: (res) => {
        this.notesList = res.notes;
        // console.log(this.notesList);
      },
      error: (err) => {
        this.notesList = [];
      },
    });
  }

  // ===

  updateNote() {
    const { _id, title, content } = this.updateNoteForm.value;

    this.updateSubscription = this.noteService
      .updeteNote(_id, { title, content })
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.getUserNote();
          this.toastrService.success('The note was updated successfully');
        }
      });
  }

  patchValue(nota: any) {
    this.updateNoteForm.patchValue(nota);
  }

  // ===

  deleteNote(id: any) {
    this.noteService.deleteNote(id).subscribe({
      next: (res) => {
        this.getUserNote();
        this.toastrService.success('The note was deleted successfully');
      }
    });
  }

  ngOnDestroy(): void {
    this.addSubscription.unsubscribe();
    this.getSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}