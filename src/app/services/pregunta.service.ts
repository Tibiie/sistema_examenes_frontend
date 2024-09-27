import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  public listarPreguntasDelExamne(examenId:any){
    return this.http.get(`${baserUrl}/api/v1/pregunta/examen/todos/${examenId}`);
  }

  public agregarPregunta(pregunta: any){
    return this.http.post(`${baserUrl}/api/v1/pregunta/agregarPregunta`, pregunta);
  }

  public obtenerPregunta(preguntaId:any){
    return this.http.get(`${baserUrl}/api/v1/pregunta/buscarPregunta/${preguntaId}`);
  }

  public actualizarPregunta(pregunta: any){
    return this.http.put(`${baserUrl}/api/v1/pregunta/actualizarPregunta`, pregunta);
  }

  public eliminarPregunta(preguntaId: any){
    return this.http.delete(`${baserUrl}/api/v1/pregunta/eliminarPregunta/${preguntaId}`);
  }

  public listarPreguntasDelExamenParaLaPrueba(examenId:any){
    return this.http.get(`${baserUrl}/api/v1/pregunta/examen/todos/${examenId}`);
  }

  public evaluarExamen(preguntas:any){
    return this.http.post(`${baserUrl}/api/v1/pregunta/evaluar-examen`,preguntas);
  }
}
