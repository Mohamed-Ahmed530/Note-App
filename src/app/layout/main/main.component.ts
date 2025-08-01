import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FotterComponent } from "../../shared/components/fotter/fotter.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
