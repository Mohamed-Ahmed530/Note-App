import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  private readonly toastrService = inject(ToastrService)


  errorMsg:any;


  private readonly formBuilder = inject( FormBuilder )
    
  registerForm:FormGroup = this.formBuilder.group({
    name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/) ]],
    age:[null, [Validators.required, Validators.min(20)]],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },)

  isvalid:boolean = false

  registerUser(){

    if (this.registerForm.valid) {
      this.userService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isvalid = true
          // console.log(res);
          setTimeout(() => {
            if (res.msg == "done" ) {
              this.router.navigate(["/login"])
              this.isvalid = true
            }
          }, 2000);
          this.toastrService.success(res.msg)
          
        },error:(err)=>{
          // console.log(err);
          this.errorMsg = err.error.msg
          this.toastrService.error(err.error.msg)
        }
      })
    }
  }

}