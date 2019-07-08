
import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';
/**
 * Directives
 */
@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {
/**
 * Output
 */
  @Output() dropped =  new EventEmitter<FileList>();
/**
 * Output
 */
  @Output() hovered =  new EventEmitter<boolean>();
/**
 * Constructor
 */
  constructor() { }
/**
 * HostListener
 */
  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }
/**
 * HostListener
 */
  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }
/**
 * HostListener
 */
  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}