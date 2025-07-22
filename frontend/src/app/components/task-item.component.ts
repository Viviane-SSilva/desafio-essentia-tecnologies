import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-item" [class.completed]="task.completed">
      <div class="task-content">
        <div class="task-date">{{ getCurrentDate() }}</div>
        <div class="task-main">
          <div class="task-checkbox" (click)="onToggle()">
            <div class="checkbox" [class.checked]="task.completed"></div>
          </div>
          <div class="task-title" [class.editing]="isEditing">
            <span *ngIf="!isEditing" (dblclick)="startEdit()">{{ task.title }}</span>
            <input 
              *ngIf="isEditing" 
              [(ngModel)]="editTitle" 
              (blur)="saveEdit()" 
              (keyup.enter)="saveEdit()"
              (keyup.escape)="cancelEdit()"
              #editInput
              class="edit-input"
            />
          </div>
          <div class="task-tag">#task</div>
        </div>
      </div>
      <div class="task-actions">
        <button class="edit-btn" (click)="startEdit()" *ngIf="!isEditing">✏️</button>
        <button class="delete-btn" (click)="onDelete()">🗑️</button>
      </div>
    </div>
  `,
  styles: [`
    .task-item {
      background: #2a2a2a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }

    .task-item.completed {
      opacity: 0.7;
    }

    .task-content {
      flex: 1;
    }

    .task-date {
      color: #888;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .task-main {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .task-checkbox {
      cursor: pointer;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #555;
      border-radius: 50%;
      background: transparent;
      transition: all 0.3s ease;
    }

    .checkbox.checked {
      background: #ffd700;
      border-color: #ffd700;
    }

    .task-title {
      flex: 1;
      color: #fff;
      font-size: 16px;
    }

    .task-title.completed {
      text-decoration: line-through;
      color: #888;
    }

    .edit-input {
      background: #333;
      border: 1px solid #555;
      border-radius: 4px;
      padding: 4px 8px;
      color: #fff;
      font-size: 16px;
      width: 100%;
    }

    .task-tag {
      color: #888;
      font-size: 14px;
    }

    .task-actions {
      display: flex;
      gap: 8px;
    }

    .edit-btn, .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.3s ease;
    }

    .edit-btn:hover, .delete-btn:hover {
      background: #444;
    }
  `]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, title: string}>();

  isEditing = false;
  editTitle = '';

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }

  startEdit() {
    this.isEditing = true;
    this.editTitle = this.task.title;
  }

  saveEdit() {
    if (this.editTitle.trim()) {
      this.update.emit({id: this.task.id, title: this.editTitle.trim()});
    }
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editTitle = '';
  }

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

