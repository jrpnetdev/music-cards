import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ToolserverService {
  private apiUrl = environment.TOOLMAKER_API_URL;

  constructor(private http: HttpClient) {}

  getArtistImages(imageName: string): Observable<string[]> {
    const url = `${this.apiUrl}${imageName}&thumbwidth=350&thumbheight=Y400`;
    const headers = new HttpHeaders({ Accept: 'text/plain' });
    return this.http
      .get(url, { headers, responseType: 'text' })
      .pipe(map((response) => this.extractImageUrls(response)));
  }

  private extractImageUrls(response: string): string[] {
    const imageUrls = [];
    const regex = /https:\/\/upload\.wikimedia\.org\/[^ "]+\.jpg/g;
    let match;
    while ((match = regex.exec(response)) !== null) {
      imageUrls.push(match[0]);
    }
    return this.extractAfterThumbnail(imageUrls[0]);
  }

  private extractAfterThumbnail(response: string): string[] {
    const thumbnailTag = '<thumbnail>';
    const result = [];
    const startIndex = response.indexOf(thumbnailTag);
    if (startIndex === -1) {
      return [];
    }

    result.push(response.substring(startIndex + thumbnailTag.length));
    return result;
  }
}
