import { Component, Input } from '@angular/core';
import { Artist } from '../Services/pagination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artist-card',
  imports: [CommonModule],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.css',
})
export class ArtistCardComponent {
  @Input() details!: Artist; // decorate the property with @Input()
}
