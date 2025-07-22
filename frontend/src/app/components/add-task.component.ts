import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="add-task-container">
      <input 
        type="text" 
        [(ngModel)]="newTaskTitle" 
        (keyup.enter)="addTask()"
        placeholder="Add Todo"
        class="add-task-input"
      />
      <button (click)="addTask()" class="add-task-btn" [disabled]="!newTaskTitle.trim()">
        +
      </button>
    </div>
  `,
  styles: [`
    .add-task-container {
      background: #2a2a2a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .add-task-input {
      flex: 1;
      background: transparent;
      border: none;
      color: #888;
      font-size: 16px;
      outline: none;
    }

    .add-task-input::placeholder {
      color: #666;
    }

    .add-task-btn {
      background: #4a4a4a;
      border: none;
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }

    .add-task-btn:hover:not(:disabled) {
      background: #5a5a5a;
    }

    .add-task-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<string>();
  
  newTaskTitle = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskAdded.emit(this.newTaskTitle.trim());
      this.newTaskTitle = '';
    }
  }
}

