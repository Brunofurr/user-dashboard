import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'City',
      zipcode: '12345',
      geo: { lat: '0', lng: '0' }
    },
    phone: '1234567890',
    website: 'john.com',
    company: {
      name: 'Company Inc',
      catchPhrase: 'Catch phrase',
      bs: 'BS'
    }
  };

  const mockUser2: User = {
    id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@example.com',
    address: {
      street: 'Second St',
      suite: 'Apt 2',
      city: 'City',
      zipcode: '54321',
      geo: { lat: '1', lng: '1' }
    },
    phone: '0987654321',
    website: 'jane.com',
    company: {
      name: 'Company Two',
      catchPhrase: 'Another phrase',
      bs: 'BS2'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save multiple users with saveEditedUsers', () => {
    const users = [mockUser, mockUser2];
    service.saveEditedUsers(users);
    
    const savedData = localStorage.getItem('user_dashboard_edited_users');
    expect(savedData).toBeTruthy();

    const parsedData = JSON.parse(savedData!);
    expect(Object.keys(parsedData).length).toBe(2);
    expect(parsedData[1].name).toBe('John Doe');
    expect(parsedData[2].name).toBe('Jane Doe');
  });

  it('should save a single edited user', () => {
    service.saveEditedUser(mockUser);
    const savedData = localStorage.getItem('user_dashboard_edited_users');
    expect(savedData).toBeTruthy();

    const parsedData = JSON.parse(savedData!);
    expect(parsedData[1]).toBeTruthy();
    expect(parsedData[1].name).toBe('John Doe');
  });

  it('should load edited users', () => {
    service.saveEditedUser(mockUser);
    const loadedUsers = service.loadEditedUsers();

    expect(loadedUsers[1]).toBeTruthy();
    expect(loadedUsers[1].name).toBe('John Doe');
    expect(loadedUsers[1].email).toBe('john@example.com');
  });

  it('should get a single edited user by ID', () => {
    service.saveEditedUser(mockUser);
    const loadedUser = service.getEditedUser(1);

    expect(loadedUser).toBeTruthy();
    expect(loadedUser?.name).toBe('John Doe');
    expect(loadedUser?.id).toBe(1);
  });

  it('should return null when getting non-existent user', () => {
    const loadedUser = service.getEditedUser(999);
    expect(loadedUser).toBeNull();
  });


  it('should handle error when loading while saving single user', () => {
    spyOn(service, 'loadEditedUsers').and.throwError('Load error');
    spyOn(console, 'error');

    service.saveEditedUser(mockUser);

    expect(console.error).toHaveBeenCalledWith('Error saving user to LocalStorage:', jasmine.any(Error));
  });
});