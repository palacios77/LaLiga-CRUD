import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { Equipo } from '../modelos/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor() { }

  // agregar
  async addEquipo(equipo: Equipo) {
    await addDoc(collection(db, 'equipos'), equipo);
  }

  // mostrar
  async getEquipos() {
    let datos = await getDocs(collection(db, 'equipos'));
    let equipos: Equipo[] = [];

    datos.forEach((d) => {
      let e = d.data() as Equipo;
      e.id = d.id;
      equipos.push(e);
    });

    return equipos;
  }

  // editar
  async updateEquipo(id: string, equipo: Equipo) {
    await updateDoc(doc(db, 'equipos', id), {
      nombre: equipo.nombre,
      ciudad: equipo.ciudad,
      estadio: equipo.estadio,
      entrenador: equipo.entrenador,
      anioFundacion: equipo.anioFundacion,
      titulos: equipo.titulos
    });
  }

  // eliminar
  async deleteEquipo(id: string) {
    await deleteDoc(doc(db, 'equipos', id));
  }
}