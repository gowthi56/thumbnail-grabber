import { Component } from '@angular/core';
import { NewservService } from '../newserv.service';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  thumbnail:boolean = false
  thumbnailBlob!: Blob;
    urlInputValue!: string;

  constructor(private youtubeThumbnailService: NewservService)
  {}
  submitUrl(videoUrl: string): void {
    this.youtubeThumbnailService.getThumbnailInfo(videoUrl)
      .subscribe(
        (data) => {
          console.log(data.type);
          this.thumbnail = true
          this.thumbnailBlob = data;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  getThumbnailUrl(): string {
    return this.thumbnailBlob ? URL.createObjectURL(this.thumbnailBlob) : '';
  }
  downloadThumbnail(): void {
    const blobUrl = URL.createObjectURL(this.thumbnailBlob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = 'thumbnail.jpeg'; // Set the filename for download
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  }
}
