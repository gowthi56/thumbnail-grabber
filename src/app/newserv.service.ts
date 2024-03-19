import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewservService {

  private apiUrl = 'https://youtube-thumbnail-api.p.rapidapi.com/';
  constructor(private http: HttpClient) { }

  getThumbnailInfo(videoUrl: string): Observable<any> {
    const encodedVideoUrl = encodeURIComponent(videoUrl);
    const apiUrlWithParams = `${this.apiUrl}?video_url=${encodedVideoUrl}`;

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '5d8546b21cmsh1cd6861bdbc24cbp1df8b4jsndf41c15a01fb',
      'X-RapidAPI-Host': 'youtube-thumbnail-api.p.rapidapi.com'
    });

    const options = { headers: headers, responseType: 'blob' as 'json' };
    return this.http.get(apiUrlWithParams, options);
  }
}
