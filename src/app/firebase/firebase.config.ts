// Archivo de conexion con Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Datos de mi proyecto de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCSsH5_HtrJrQejYU9wqWfklPUJcbRpO6s',
  authDomain: 'laliga-crud.firebaseapp.com',
  projectId: 'laliga-crud',
  storageBucket: 'laliga-crud.firebasestorage.app',
  messagingSenderId: '330470510589',
  appId: '1:330470510589:web:9814f7026771b87e545394'
};

// Se inicia la aplicacion de Firebase
const app = initializeApp(firebaseConfig);

// Se obtiene la base de datos Firestore y se exporta para usarla en el servicio
export const db = getFirestore(app);