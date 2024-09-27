import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;

  constructor(private locationSt: LocationStrategy,
     private route:ActivatedRoute,
     private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).pipe(
      tap((data) =>{
        console.log(data);
        this.preguntas = data;

        this.preguntas.forEach((p:any) => {
          p['respuestaDada'] = '';
        });
        console.log(this.preguntas);

      }),catchError((error: Error) => {
        console.error(error);
        Swal.fire('Error al cargar las preguntas','Las preguntas no pudieron ser cargadas con exito','warning');
        return of([])
      })
    ).subscribe()
  }

  prevenirElBotonDeRetroceso(){
    history.pushState(null,null!,location.href);
    this.locationSt.onPopState(() =>{
      history.pushState(null,null!,location.href);
    })
  }

  enviarCuestionario(){
    
  }
}
