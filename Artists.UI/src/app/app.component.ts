import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WikiDataService } from './Services/wiki-data.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { map } from 'rxjs';
import { ToolserverService } from './Services/toolserver.service';
import { PaginationService, Artist } from './Services/pagination.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, JsonPipe, ArtistCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  artistList: Artist[] = [];
  artistImageList: string[] = [];
  specialEntityData: string = '';
  startIndex: number = 0;
  cardLimit: number = 4; // 4 cards the default number of cards to display
  imagepath: string = 'imageNotAvailable.png';

  constructor(
    private webApiSearch: PaginationService,
    private wikiDataSearch: WikiDataService,
    private toolService: ToolserverService
  ) {}

  ngOnInit() {
    this.webApiSearch
      .search(this.startIndex, this.cardLimit)
      .subscribe((artistList) => {
        this.artistList = artistList;
        console.log(artistList);
      });
  }

  paginateRight() {
    this.startIndex += this.cardLimit;
    this.webApiSearch
      .search(this.startIndex, this.cardLimit)
      .subscribe((artistList) => {
        this.artistList = artistList;
        console.log(artistList);
      });
  }
  paginateLeft() {
    this.startIndex -= this.cardLimit;
    this.webApiSearch
      .search(this.startIndex, this.cardLimit)
      .subscribe((artistList) => {
        this.artistList = artistList;
        console.log(artistList);
      });
  }

  toolServiceSearch(imageName: string) {
    this.toolService.getArtistImages(imageName).subscribe((response) => {
      this.artistImageList = response;
      console.log('from toolServiceSearch()');
      console.log(this.artistImageList);
    });
  }

  imgButtonClick() {
    this.getImages();
  }

  getImages() {
    this.wikiDataSearch
      .search(this.artistList[0].specialEntityData)
      .pipe(map((x) => this.extractJpgImages(x)))
      .subscribe((response) => {
        if (response.length === 0) {
          this.artistImageList = ['imageNotAvailable.png'];
        } else {
          // response[0] = response[0].replace(/\s+/g, '_');
          // response[0] =
          //   'https://upload.wikimedia.org/wikipedia/commons/b/bf/' + response;

          //Send this to https://magnus-toolserver.toolforge.org/commonsapi.php?image=File:
          this.toolServiceSearch(response[0]);
        }
        console.log(this.artistImageList);
      });
  }

  // TODO: NO LONGER NEEDED - see structure in wikidata.service.ts
  extractJpgImages(data: any): string[] {
    let jpgUrls: string[] = [];

    const processObject = (obj: any) => {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          const item = obj[key];
          if (typeof item === 'string' && item.endsWith('.jpg')) {
            jpgUrls.push(item);
          } else if (typeof item === 'object' && item !== null) {
            processObject(item);
          }
        }
      }
    };

    processObject(data);
    return jpgUrls;
  }
}
