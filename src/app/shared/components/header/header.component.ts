import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navLinks = [
    {
      label: 'Productos',
      route: '/productos',
      icon: 'pi-box'
    },
    {
      label: 'Movimientos',
      route: '/movimientos',
      icon: 'pi-sync'
    }
  ];
}