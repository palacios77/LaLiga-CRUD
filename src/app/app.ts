// Componente principal: solo muestra la pantalla de Equipos

import { Component } from '@angular/core';
import { Equipos } from './equipos/equipos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Equipos],
  template: '<app-equipos></app-equipos>'
})
export class App { }