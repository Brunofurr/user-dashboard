import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() user!: User;
  @Input() isEditingAny = false;
  @Output() cardClick = new EventEmitter<User>();
  @Output() userEdit = new EventEmitter<User>();
  @Output() editingStateChange = new EventEmitter<{ userId: number; isEditing: boolean }>();

  isEditing = false;
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.editForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      company: this.fb.group({
        name: [this.user.company.name, Validators.required]
      })
    });
  }

  onCardClick(): void {
    if (!this.isEditing && !this.isEditingAny) {
      this.cardClick.emit(this.user);
    }
  }

  startEditing(event: Event): void {
    event.stopPropagation();
    if (this.isEditingAny) return;

    this.isEditing = true;
    this.editingStateChange.emit({ userId: this.user.id, isEditing: true });

    this.editForm.patchValue({
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      company: {
        name: this.user.company.name
      }
    });
  }

  saveEdit(event: Event): void {
    event.stopPropagation();
    
    if (this.editForm.valid) {
      const editedUser: User = {
        ...this.user,
        ...this.editForm.value
      };
      
      this.userEdit.emit(editedUser);
      this.isEditing = false;
      this.editingStateChange.emit({ userId: this.user.id, isEditing: false });
    } else {
      Object.keys(this.editForm.controls).forEach(key => {
        const control = this.editForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancelEdit(event: Event): void {
    event.stopPropagation();
    this.isEditing = false;
    this.editingStateChange.emit({ userId: this.user.id, isEditing: false });

    this.initializeForm();
  }

  get nameControl() {
    return this.editForm.get('name');
  }

  get emailControl() {
    return this.editForm.get('email');
  }

  get companyNameControl() {
    return this.editForm.get('company.name');
  }
}