import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  public listarCuestionarios(){
    return this.http.get(`${baserUrl}/api/v1/examen/examenes`);
  }

  public agregarExamen(examen:any){
    return this.http.post(`${baserUrl}/api/v1/examen/agregarExamen`,examen);
  }

  public eliminarExamen(examenId:any){
    return this.http.delete(`${baserUrl}/api/v1/examen/eliminarExamen/${examenId}`);
  }

  public obtenerExamen(examenId:any){
    return this.http.get(`${baserUrl}/api/v1/examen/buscarExamen/${examenId}`);
  }

  public actualizarExamen(examen:any){
    return this.http.put(`${baserUrl}/api/v1/examen/actualizarExamen`, examen);
  }
} 

