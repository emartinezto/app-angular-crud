import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  toggleMenu(event: any) {
    const header = (event.currentTarget as HTMLElement).closest('header');
    if (header) {
      header.classList.toggle('is-open');
    }
  }
}
