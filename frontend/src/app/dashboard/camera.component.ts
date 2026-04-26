import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-camera',
  template: `
    <div class="camera-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Capture Image</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="video-wrapper">
            <video #video autoplay playsinline></video>
            <canvas #canvas [style.display]="'none'"></canvas>
          </div>
          
          <div class="preview-wrapper" *ngIf="capturedImage">
            <h3>Preview:</h3>
            <img [src]="capturedImage" alt="captured image preview">
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="capture()" [disabled]="uploading">
            <mat-icon>camera_alt</mat-icon> Capture
          </button>
          <button mat-raised-button color="accent" (click)="upload()" *ngIf="capturedImage" [disabled]="uploading">
            <mat-icon>cloud_upload</mat-icon> {{ uploading ? 'Uploading...' : 'Upload' }}
          </button>
          <button mat-button (click)="retake()" *ngIf="capturedImage" [disabled]="uploading">Retake</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .camera-container { display: flex; justify-content: center; padding: 20px; }
    .video-wrapper video { width: 100%; max-width: 500px; border-radius: 8px; border: 2px solid #ccc; }
    .preview-wrapper img { width: 100%; max-width: 500px; border-radius: 8px; margin-top: 10px; }
    mat-card { width: 100%; max-width: 550px; }
    mat-card-actions { justify-content: flex-end; gap: 10px; }
  `]
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  capturedImage: string | null = null;
  imageBlob: Blob | null = null;
  uploading = false;

  constructor(private imageService: ImageService, private snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.startCamera();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;
    } catch (err: any) {
      this.snackBar.open('Error accessing camera: ' + err, 'Close', { duration: 3000 });
    }
  }

  capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/jpeg');
      
      canvas.toBlob((blob) => {
        this.imageBlob = blob;
      }, 'image/jpeg');
    }
  }

  retake() {
    this.capturedImage = null;
    this.imageBlob = null;
  }

  upload() {
    if (!this.imageBlob) return;

    this.uploading = true;
    this.imageService.uploadImage(this.imageBlob).subscribe({
      next: (res) => {
        this.snackBar.open('Image uploaded successfully!', 'Close', { duration: 3000 });
        this.retake();
        this.uploading = false;
      },
      error: (err: any) => {
        this.snackBar.open('Upload failed: ' + err.message, 'Close', { duration: 3000 });
        this.uploading = false;
      }
    });
  }
}
