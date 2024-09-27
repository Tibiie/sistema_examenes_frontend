import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';
import { catchError, of, tap } from 'rxjs';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {
  examenId:any;
  examen:any;

  constructor(private examenService: ExamenService,
     private route:ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.examenService.obtenerExamen(this.examenId).pipe(
      tap((data) =>{
        console.log(data);
        this.examen = data;

      }),catchError((error: Error) => {

        console.error(error);
        return of([])
      })
    ).subscribe()
  }

  empezarExamen(){
    Swal.fire({
      title: "Empezar cuestionario",
      text: "¿Estas seguro de que quieres empezar el examen?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Comenzar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.examenId]);
      }
    });

  }
}
