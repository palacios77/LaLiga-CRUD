import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../servicios/equipo.service';
import { Equipo } from '../modelos/equipo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './equipos.html',
  styleUrl: './equipos.css'
})
export class Equipos implements OnInit {

  equipo: Equipo = {
    nombre: '',
    ciudad: '',
    estadio: '',
    entrenador: '',
    anioFundacion: 0,
    titulos: 0
  };

  equipos: Equipo[] = [];
  modoEditar = false;

  constructor(private service: EquipoService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.mostrar();
  }

  async mostrar() {
    this.equipos = await this.service.getEquipos();
    this.cd.detectChanges(); // para que se actualice la tabla
  }

  async guardar() {
    if (this.equipo.nombre == '' || this.equipo.ciudad == '' || this.equipo.estadio == '' || this.equipo.entrenador == '') {
      Swal.fire('Error', 'Llene todos los campos', 'warning');
      return;
    }

    if (this.modoEditar) {
      await this.service.updateEquipo(this.equipo.id!, this.equipo);
      Swal.fire('Listo', 'Equipo actualizado', 'success');
    } else {
      await this.service.addEquipo(this.equipo);
      Swal.fire('Listo', 'Equipo guardado', 'success');
    }

    this.limpiar();
    this.mostrar();
  }

  seleccionar(e: Equipo) {
    this.equipo = {
      id: e.id,
      nombre: e.nombre,
      ciudad: e.ciudad,
      estadio: e.estadio,
      entrenador: e.entrenador,
      anioFundacion: e.anioFundacion,
      titulos: e.titulos
    };
    this.modoEditar = true;
  }

  eliminar(e: Equipo) {
    Swal.fire({
      title: '¿Eliminar ' + e.nombre + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(async (r) => {
      if (r.isConfirmed) {
        await this.service.deleteEquipo(e.id!);
        Swal.fire('Listo', 'Equipo eliminado', 'success');
        this.mostrar();
      }
    });
  }

  limpiar() {
    this.equipo = {
      nombre: '',
      ciudad: '',
      estadio: '',
      entrenador: '',
      anioFundacion: 0,
      titulos: 0
    };
    this.modoEditar = false;
  }
}