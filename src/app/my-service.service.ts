import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  
  //private apiUrl = 'http://tnhs.v90.us/photos'; // URL of the JSON data
  // private apiUrl = 'http://localhost/selfaware/'; // URL of the JSON data
  // private photoPathUrl = 'assets/photo-paths.json';
  private apiUrl = 'http://localhost/php-basecore/api/hey/index.php';
  constructor(private http: HttpClient) { }

  token:any = sessionStorage.getItem('token');

  userLogin(data:any): Observable<any> {

    return this.http.post(this.apiUrl + '/login', data);
  }

  getSubData(data:any): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.post(this.apiUrl + '/retrieve', data, { headers: headers });
  }

  getSubDataUseronly(data:any): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.post(this.apiUrl + '/retrieve-useronly', data, { headers: headers });
  }

  addNewNotes(data:any): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.post(this.apiUrl + '/addnotes', data, { headers: headers });
  }

  editNotes(data:any): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.post(this.apiUrl + '/editNotes', data, { headers: headers });
  }

  deleteNotes(data:any): Observable<any> {
    const headers = new HttpHeaders().set('Token', this.token);
    return this.http.post(this.apiUrl + '/deleteNotes', data, { headers: headers });
  }

  // getPhotos(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  // getPhotoPaths(): Observable<string[]> {
  //   return this.http.get<string[]>(this.photoPathUrl);
  // }
}
