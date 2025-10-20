import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  version = '1.0.0';
  
  technologies = [
    { name: 'Angular', version: '16', icon: 'pi-code' },
    { name: 'NgRx', version: '16', icon: 'pi-sitemap' },
    { name: 'PrimeNG', version: '16', icon: 'pi-palette' }
  ];
}