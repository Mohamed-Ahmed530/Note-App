import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly userService = inject(UserService)
  private readonly router = inject(Router)
  private readonly toastrService = inject(ToastrService)
  

  errorMsg:any;

  private readonly formBuilder = inject( FormBuilder )
    
  loginForm:FormGroup = this.formBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/) ]],
  },)

  isvalid:boolean = false

  loginUser(){

    if (this.loginForm.valid) {
      this.userService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          // console.log(res);
          this.isvalid = true
          setTimeout(() => {
            if (res.msg == 'done' ) {
              this.isvalid = false 
              this.errorMsg = null
              localStorage.setItem('token', res.token)
              this.router.navigate(['/home'])
              this.toastrService.success(res.msg)
            }
          }, 2000);
          
        },error:(err)=>{
          // console.log(err);
          this.errorMsg = err.error.msg
          this.toastrService.error(err.error.msg)
        }
      })
    }
  }
}