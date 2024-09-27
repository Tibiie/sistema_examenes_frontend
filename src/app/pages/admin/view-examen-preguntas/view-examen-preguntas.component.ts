import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit {

  examenId: any;
  titulo: any;
  preguntas:any = [];

  constructor(private route: ActivatedRoute,private preguntaService: PreguntaService) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];

    this.preguntaService.listarPreguntasDelExamne(this.examenId).pipe(
      tap((data: any) => {
        console.log(data);
        this.preguntas = data;
      }),catchError((error: Error) => {
        console.error(error);
        return of([])
      })
    ).subscribe()
  }
  eliminarPregunta(preguntaId: any) {
    Swal.fire({
      title: "Eliminar pregunta",
      text: "¿Estás seguro de que quieres eliminar la pregunta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.preguntaService.eliminarPregunta(preguntaId).pipe(
          tap(() => {
            Swal.fire({
              title: "Pregunta eliminada",
              text: "La pregunta fue eliminada con éxito.",
              icon: "success"
            });
            // Actualizar el array de preguntas
            this.preguntas = this.preguntas.filter((pregunta: any) => pregunta.preguntaId !== preguntaId);
          }),
          catchError((error: Error) => {
            Swal.fire('Error al eliminar la pregunta', 'No se pudo eliminar la pregunta correctamente en el sistema.', 'error');
            console.error(error);
            return of([]);  // Retorna un observable vacío en caso de error
          })
        ).subscribe();
      }
    });
  }
  
}
