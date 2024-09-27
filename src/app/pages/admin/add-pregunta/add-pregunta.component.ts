import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit {

  examenId: any;
  titulo: any;

  pregunta: any = {
    examen : {},
    contenido: '',
    opcion1: '',
    opcion2: '',
    opcion3: '', 
    opcion4: '',
    respuesta: ''
  }

  constructor(private route: ActivatedRoute,
     private preguntaService: PreguntaService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];

    this.pregunta.examen['examenId'] = this.examenId;

  }

  formSubmit(){
    if (this.pregunta.contenido.trim() == '' || this.pregunta.contenido == null) {
      return;
    }

    if (this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null) {
      return;
    }

    if (this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null) {
      return;
    }

    if (this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null) {
      return;
    }

    if (this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null) {
      return;
    }

    if (this.pregunta.respuesta.trim() == '' || this.pregunta.respuesta == null) {
      return;
    }

    this.preguntaService.agregarPregunta(this.pregunta).pipe(
      tap((data) => {
        Swal.fire('Pregunta guardada','Pregunta registrada con exito en el sistema','success');
        this.pregunta.contenido = '';
        this.pregunta.opcion1 = '';
        this.pregunta.opcion2 = '';
        this.pregunta.opcion3 = '';
        this.pregunta.opcion4 = '';
        this.pregunta.respuesta = '';

      }),catchError((error: Error) => {
        Swal.fire('Error al guardar la pregunta','Pregunta no pudo ser guardada con exito en el sistema','warning');
        console.error(error);
        return of([])
      })
    ).subscribe()
  }
}
