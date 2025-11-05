import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'user_dashboard_edited_users';

  saveEditedUsers(users: User[]): void {
    try {
      const editedUsersMap: Record<number, User> = {};
      users.forEach(user => {
        editedUsersMap[user.id] = user;
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(editedUsersMap));
    } catch (error) {
      console.error('Error saving to LocalStorage:', error);
    }
  }

  loadEditedUsers(): Record<number, User> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading from LocalStorage:', error);
      return {};
    }
  }

  saveEditedUser(user: User): void {
    try {
      const editedUsers = this.loadEditedUsers();
      editedUsers[user.id] = user;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(editedUsers));
    } catch (error) {
      console.error('Error saving user to LocalStorage:', error);
    }
  }

  getEditedUser(userId: number): User | null {
    const editedUsers = this.loadEditedUsers();
    return editedUsers[userId] || null;
  }

  clearEditedUsers(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing LocalStorage:', error);
    }
  }
}
