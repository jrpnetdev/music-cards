import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WikiDataService {
  constructor(private http: HttpClient) {}

  //https://www.wikidata.org/wiki/Special:EntityData/Q750593.json

  search(wikiDataSpecialEntityUrl: string) {
    wikiDataSpecialEntityUrl =
      environment.WIKIDATA_API_URL + `${wikiDataSpecialEntityUrl}.json`;
    console.log(wikiDataSpecialEntityUrl);
    return this.http.get(wikiDataSpecialEntityUrl, {
      params: {
        //origin: '*',
      },
    });
    //.pipe
    //map(x => x.query.search)
    //();
  }

  //"entites": {
  //Q.... wikiDataSpecialEntityUrl

  /*   "claims": {
  "P18": [
    {
      "mainsnak": {
        "datavalue": {
          "value": "Image_filename.jpg"
        }
      }
    }
  ]
} */
}
