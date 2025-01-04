import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface Artist {
  artistId: number;
  name: string;
  mbid: string;
  specialEntityData: string;
  albums: Album[];
}

export interface Album {
  albumId: number;
  title: string;
  artistId: number;
  artist: any;
  tracks: any[];
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  search(start: number, limit: number) {
    return this.http
      .get<Artist[]>(environment.CORE_API_PAGINATION_URL, {
        params: {
          origin: '*',
          startIndex: start.toString(),
          limit: limit.toString(),
        },
      })
      .pipe
      //map(x => x.query.search)
      ();
  }
}
