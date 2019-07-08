import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascota } from 'src/app/models/mascota';


/**
 * Constante colors
 */
const colors: any = {
  vacunas: {
    primary: '#778beb',
  },
  celos: {
    primary: '#f19066',
  },
  consultas: {
    primary: '#f5cd79',
  },
  desparasitaciones:{
    primary: '#786fa6',
  },
  observaciones: {
    primary:'#f8a5c2'
  }
  
};
/**
 * Componente
 */
@Component({
  /**
 * selector
 */
  selector: 'app-calendario',
  /**
 * templateUrl
 */
  templateUrl: './calendario.component.html',
  /**
 * styleUrls
 */
  styleUrls: ['./calendario.component.css']
})
/**
 * Clase
 */
export class CalendarioComponent {
/**
 * Declara variable mascotaActual
 */
  mascotaActual: Mascota;
  /**
 * Declara variable celoMascota
 */
  celoMascota: any;

 /**
 * ViewChild
 */
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
/**
 * Declara variable view
 */
  view: CalendarView = CalendarView.Month;
/**
 * Declara variable CalendarView
 */
  CalendarView = CalendarView;
/**
 * Declara variable viewDate
 */
  viewDate: Date = new Date();
/**
 * Declara variable modalData
 */
  modalData: {
    action: string;
    event: CalendarEvent;
  };
/**
 * Declara variable actions
 */
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
/**
 * Declara variable refresh
 */
  refresh: Subject<any> = new Subject();
/**
 * Declara variable events
 */
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
/**
 * Declara variable activeDayIsOpen
 */
  activeDayIsOpen: boolean = true;
/**
 * Constructor
 */
  constructor(private modal: NgbModal) {}
/**
 * Funcion click day
 */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
/**
 * Funcion
 */
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
/**
 * Funcion
 */
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
/**
 * Funcion agrega evento
 */
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }
/**
 * Funcion borra evento
 */
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }
/**
 * Funcion
 */
  setView(view: CalendarView) {
    this.view = view;
  }
/**
 * Funcion
 */
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}