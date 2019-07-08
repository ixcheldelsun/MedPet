import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import listPlugin from '@fullcalendar/list';
import bootstrap from '@fullcalendar/bootstrap'
import { es } from '@fullcalendar/core/locales/es';

import { MascotasService } from '../../services/mascotas.service';
import { Mascota } from 'src/app/models/mascota';



/**
 * Componente
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
/**
 * Clase
 */
export class CalendarComponent implements OnInit {
/**
 * ViewChild
 */
  @ViewChild('calendar') calendarComponent: FullCalendarComponent; 
/**
 * Declaracion de colores
 */
  colors: any = {
    vacunas: '#778beb',
    celos: '#f19066',
    consultas: '#f5cd79',
    desparasitaciones: '#786fa6',
    observaciones: '#f8a5c2',
  };
  /**
 * Declaracion de calendarPlugins
 */
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin, listPlugin, bootstrap];
 
/**
 * Declaracion de mascotaActual
 */
  mascotaActual: Mascota;
/**
 * Declaracion de fechasCelos
 */
  fechasCelos: EventInput[] = [];
/**
 * Declaracion de fechasVacunas
 */
  fechasVacunas: EventInput[] = [];
/**
 * Declaracion de fechasConsultas
 */
  fechasConsultas: EventInput[] = [];
/**
 * Declaracion de fechasDesparasitaciones
 */
  fechasDesparasitaciones: EventInput[] = [];
/**
 * Declaracion de fechasObservaciones
 */
  fechasObservaciones: EventInput[] = [];
/**
 * Declaracion de calendarEvents
 */
  calendarEvents: EventInput[] = [];
/**
 * Constructor
 */
  constructor( private mascotaService: MascotasService, private router: Router, private activatedRoute: ActivatedRoute ) { }
/**
 * ngOnInit
 */
  ngOnInit() {

    this.mascotaActual = this.mascotaService.mascotaActual;
/**
 * Condicionales
 */
    if(!this.mascotaActual) {
      this.router.navigate(['/escoger-mascota'])
    }
  /**
 * Condicionales
 */
    else{
      //Agregar las fechas de celo al calendario
      this.mascotaService.getCelos(this.mascotaActual.id_mascota).subscribe( 
        celos => {
          const size = Object.keys(celos);//para obtener el tamaño del objeto celos
          let agregar: EventInput;

          for (let i = 0; i < size.length ; i++) {
            agregar = {
              title: "Celo nro: "+ (i+1),
              start: celos[i].fecha_i,
              color: this.colors.celos
            };
            this.fechasCelos.push(agregar);
          }
          this.agregarFechas(this.fechasCelos);
        },
        err =>{
          console.log(err);
        }
      )

      //Agregar las fechas de vacunas al calendario
      this.mascotaService.getVacunas(this.mascotaActual.id_mascota).subscribe( 
        vacunas => {
          const size = Object.keys(vacunas);//para obtener el tamaño del objeto celos
          let agregar: EventInput;

          for (let i = 0; i < size.length ; i++) {
            agregar = {
              title: vacunas[i].nombre +" "+ vacunas[i].dosis,
              start: vacunas[i].fecha_i,
              end: vacunas[i].fecha_f,
              color: this.colors.vacunas
            };
            this.fechasVacunas.push(agregar);
          }
          this.agregarFechas(this.fechasVacunas);
      
        },
        err =>{
          console.log(err);
        }
      )
      //Agregar las fechas de consultas
      this.mascotaService.getConsultas(this.mascotaActual.id_mascota).subscribe( 
        consultas => {
          const size = Object.keys(consultas);
          let agregar: EventInput;

          for (let i = 0; i < size.length ; i++) {
            agregar = {
              title: "Consulta nro: "+ (i+1),
              start: consultas[i].fecha,
              color: this.colors.consultas
            };
            this.fechasConsultas.push(agregar);
          }
          this.agregarFechas(this.fechasConsultas);
      
        },
        err =>{
          console.log(err);
        }
      )

      //Agregar las fechas de observaciones
      this.mascotaService.getObservaciones(this.mascotaActual.id_mascota).subscribe( 
        observaciones => {
          const size = Object.keys(observaciones);
          let agregar: EventInput;

          for (let i = 0; i < size.length ; i++) {
            agregar = {
              title: "Observación nro: "+ (i+1),
              start: observaciones[i].fecha,
              color: this.colors.observaciones
            };
            this.fechasObservaciones.push(agregar);
          }
          this.agregarFechas(this.fechasObservaciones);
      
        },
        err =>{
          console.log(err);
        }
      )

      //Agregar las fechas de desparasitaciones
      this.mascotaService.getDesparasitaciones(this.mascotaActual.id_mascota).subscribe( 
        desparasitaciones => {
          const size = Object.keys(desparasitaciones);
          let agregar: EventInput;

          for (let i = 0; i < size.length ; i++) {
            agregar = {
              title: "Desparasitación nro: "+ (i+1),
              start: desparasitaciones[i].fecha,
              end: desparasitaciones[i].vencimiento,
              color: this.colors.desparasitaciones
            };
            this.fechasDesparasitaciones.push(agregar);
          }
          this.agregarFechas(this.fechasDesparasitaciones);
      
        },
        err =>{
          console.log(err);
        }
      )
    }
    
  }
/**
 * Funcion agregar fechas
 */
  agregarFechas(fechas: EventInput[]) {
    this.calendarEvents = this.calendarEvents.concat(fechas);
  }

}
