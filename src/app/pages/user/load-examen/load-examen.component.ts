import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit {

  catId: any;
  examenes: any = new Object();

  constructor(private route: ActivatedRoute, private examenService: ExamenService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.catId = params['catId'];

      if (this.catId == 0) {
        console.log("Cargando todos los examenes");
        this.examenService.obtenerExamenesActivos().pipe(
          tap((data) => {
            this.examenes = data;
            console.log(this.examenes);
            
          }),catchError((error: Error) => {
            Swal.fire('Error al guardar la pregunta','Pregunta no pudo ser guardada con exito en el sistema','warning');
            console.error(error);
            return of([])
        })
      ).subscribe()
      
      }else{
        console.log("Cargando un examen en especifico");
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.catId).pipe(
          tap((data)=> {
            this.examenes = data;
            console.log(this.examenes);
  
          }),catchError((error: Error) => {
            console.error(error);
            return of([])
          })
        ).subscribe()
      }
    })
  }
}
