import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() entities: any[] = [];
  @Input() columns: { header: string, field: string }[] = [];
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();

  onUpdate(entity: any): void {
    this.update.emit(entity);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}

