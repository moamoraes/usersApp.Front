import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['user-list.component.css'],
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    MatTableModule,
  ],
})
export class UserListComponent {
  users: User[] = [];
  newUser: User = {
    fullName: '',
    birthDate: new Date(),
    income: null,
    cpf: '',
  };
  editingUser: User | null = null;
  displayedColumns: string[] = [
    'fullName',
    'birthDate',
    'income',
    'cpf',
    'actions',
  ];

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

  addUser() {
    if (
      this.newUser.cpf &&
      this.newUser.birthDate &&
      this.newUser.fullName &&
      this.newUser.income
    )
      this.userService.addUser(this.newUser).subscribe({
        next: () => {
          this.loadUsers();
          this.newUser = {
            fullName: '',
            birthDate: new Date(),
            income: null,
            cpf: '',
          };
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  startEdit(user: User) {
    this.editingUser = { ...user };
  }

  saveEdit() {
    if (
      this.editingUser?.cpf &&
      this.editingUser?.birthDate &&
      this.editingUser?.fullName &&
      this.editingUser?.income
    )
      if (this.editingUser) {
        this.userService
          .updateUser(this.editingUser.cpf, this.editingUser)
          .subscribe({
            next: () => {
              this.loadUsers();
              this.editingUser = null;
            },
            error: (error) => {
              alert(error.error.message);
            },
          });
      }
  }

  deleteUser(cpf: string) {
    this.userService.deleteUser(cpf).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
