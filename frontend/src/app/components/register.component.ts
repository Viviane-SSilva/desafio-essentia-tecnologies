import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Registro</h1>
        <form (ngSubmit)="onRegister()" class="auth-form">
          <div class="form-group">
            <label for="name">Nome</label>
            <input 
              type="text" 
              id="name"
              [(ngModel)]="registerData.name" 
              name="name"
              placeholder="Digite seu nome"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email"
              [(ngModel)]="registerData.email" 
              name="email"
              placeholder="Digite seu email"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="senha">Senha</label>
            <input 
              type="password" 
              id="password"
              [(ngModel)]="registerData.password" 
              name="password"
              placeholder="Digite sua senha"
              class="form-input"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword"
              [(ngModel)]="registerData.confirmPassword" 
              name="confirmPassword"
              placeholder="Confirme sua senha"
              class="form-input"
              required
            />
          </div>
          
          <div *ngIf="passwordMismatch" class="error-message">
            As senhas não coincidem
          </div>
          
          <button 
            type="submit" 
            class="auth-button"
            [disabled]="!isFormValid()"
          >
            Registrar
          </button>
          
          <div class="auth-link">
            <p>Já tem uma conta? 
              <a (click)="goToLogin()" class="link">Faça login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: #2a2a2a;
      border-radius: 12px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .auth-title {
      color: #fff;
      font-size: 28px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      color: #ccc;
      font-size: 14px;
      font-weight: 500;
    }

    .form-input {
      background: #333;
      border: 1px solid #555;
      border-radius: 8px;
      padding: 12px 16px;
      color: #fff;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #ffd700;
    }

    .form-input::placeholder {
      color: #888;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 14px;
      text-align: center;
    }

    .auth-button {
      background: #ffd700;
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .auth-button:hover:not(:disabled) {
      background: #ffed4e;
      transform: translateY(-1px);
    }

    .auth-button:disabled {
      background: #666;
      color: #999;
      cursor: not-allowed;
      transform: none;
    }

    .auth-link {
      text-align: center;
      margin-top: 20px;
    }

    .auth-link p {
      color: #ccc;
      font-size: 14px;
    }

    .link {
      color: #ffd700;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  get passwordMismatch(): boolean {
    return this.registerData.password !== this.registerData.confirmPassword && 
           this.registerData.confirmPassword.length > 0;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isFormValid(): boolean {
    return this.registerData.name.trim() !== '' &&
           this.registerData.email.trim() !== '' &&
           this.registerData.password.trim() !== '' &&
           this.registerData.confirmPassword.trim() !== '' &&
           this.registerData.password === this.registerData.confirmPassword;
  }

  onRegister() {
    if (this.isFormValid()) {
      const { name, email, password } = this.registerData;
      this.authService.register({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Registro realizado com sucesso:', response);
          this.router.navigate(['/todos']);
        },
        error: (error) => {
          console.error('Erro no registro:', error);
          // TODO: Mostrar mensagem de erro para o usuário
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

