import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environments';
import { API_CONSTANTS } from '../constants';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}${API_CONSTANTS.ENDPOINTS.USERS}`;
  
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
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    address: {
      street: 'Second St',
      suite: 'Apt 2',
      city: 'Another City',
      zipcode: '54321',
      geo: { lat: '1', lng: '1' }
    },
    phone: '0987654321',
    website: 'jane.com',
    company: {
      name: 'Company Two',
      catchPhrase: 'Another catch phrase',
      bs: 'Another BS'
    }
  };

  const mockUsers: User[] = [mockUser, mockUser2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('Jane Smith');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by id', () => {
    const userId = 1;
    
    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
      expect(user.id).toBe(userId);
      expect(user.name).toBe('John Doe');
    });

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch different user by id', () => {
    const userId = 2;
    
    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(mockUser2);
      expect(user.id).toBe(userId);
      expect(user.name).toBe('Jane Smith');
    });

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser2);
  });

  it('should return empty array when no users', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should handle error when fetching users fails', () => {
    const errorMessage = 'Server error';
    
    service.getUsers().subscribe(
      () => fail('should have failed with server error'),
      error => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle error when fetching user by id fails', () => {
    const userId = 999;
    const errorMessage = 'User not found';
    
    service.getUserById(userId).subscribe(
      () => fail('should have failed with 404 error'),
      error => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should make only one request when getting users', () => {
    service.getUsers().subscribe();
    
    const requests = httpMock.match(apiUrl);
    expect(requests.length).toBe(1);
    requests[0].flush(mockUsers);
  });

  it('should make only one request when getting user by id', () => {
    const userId = 1;
    service.getUserById(userId).subscribe();
    
    const requests = httpMock.match(`${apiUrl}/${userId}`);
    expect(requests.length).toBe(1);
    requests[0].flush(mockUser);
  });

  it('should handle network error when fetching users', () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Network connection failed'
    });
    
    service.getUsers().subscribe(
      () => fail('should have failed with network error'),
      error => {
        expect(error.error.message).toBe('Network connection failed');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.error(errorEvent);
  });

  it('should handle network error when fetching user by id', () => {
    const userId = 1;
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Network connection failed'
    });
    
    service.getUserById(userId).subscribe(
      () => fail('should have failed with network error'),
      error => {
        expect(error.error.message).toBe('Network connection failed');
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    req.error(errorEvent);
  });

  it('should use correct URL from environment and constants', () => {
    service.getUsers().subscribe();
    
    const req = httpMock.expectOne(request => {
      return request.url === `${environment.apiUrl}${API_CONSTANTS.ENDPOINTS.USERS}`;
    });
    
    expect(req.request.url).toBe(apiUrl);
    req.flush(mockUsers);
  });

  it('should handle timeout error', () => {
    service.getUsers().subscribe(
      () => fail('should have failed with timeout'),
      error => {
        expect(error.status).toBe(0);
        expect(error.statusText).toBe('Unknown Error');
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush(null, { status: 0, statusText: 'Unknown Error' });
  });
});