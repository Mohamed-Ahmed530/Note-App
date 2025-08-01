import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FotterComponent } from "../../shared/components/fotter/fotter.component";

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
