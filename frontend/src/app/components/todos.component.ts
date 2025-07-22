import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { AuthService, User } from '../services/auth.service';
import { TaskItemComponent } from './task-item.component';
import { AddTaskComponent } from './add-task.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskItemComponent, AddTaskComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">Todo App</h1>
          <div class="user-info" *ngIf="currentUser$ | async as user">
            <span class="welcome-text">Olá, {{ user.name }}!</span>
            <button class="logout-btn" (click)="logout()">Sair</button>
          </div>
        </div>
      </header>
      
      <div class="todo-container">
        <app-add-task (taskAdded)="onTaskAdded($event)"></app-add-task>
        
        <div class="tasks-list">
          <app-task-item 
            *ngFor="let task of tasks$ | async" 
            [task]="task"
            (toggle)="onTaskToggle($event)"
            (delete)="onTaskDelete($event)"
            (update)="onTaskUpdate($event)">
          </app-task-item>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #1a1a1a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .app-header {
      background: #2a2a2a;
      border-bottom: 1px solid #333;
      padding: 16px 20px;
    }

    .header-content {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-title {
      color: #fff;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .welcome-text {
      color: #ccc;
      font-size: 14px;
    }

    .logout-btn {
      background: #ff6b6b;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .logout-btn:hover {
      background: #ff5252;
    }

    .todo-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `]
})
export class TodosComponent implements OnInit {
  tasks$: Observable<Task[]>;
  currentUser$: Observable<User | null>;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {
    this.tasks$ = this.taskService.getTasks();
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {}

  onTaskAdded(title: string) {
    this.taskService.addTask(title);
  }

  onTaskToggle(id: number) {
    this.taskService.toggleTask(id);
  }

  onTaskDelete(id: number) {
    this.taskService.deleteTask(id);
  }

  onTaskUpdate(data: {id: number, title: string}) {
    this.taskService.updateTask(data.id, { title: data.title });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

