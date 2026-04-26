import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageService {
    constructor(private http: HttpClient) { }

    uploadImage(imageBlob: Blob) {
        const formData = new FormData();
        formData.append('image', imageBlob, 'capture.jpg');
        return this.http.post<any>(`${environment.apiUrl}/images/upload`, formData);
    }

    getImages() {
        return this.http.get<any>(`${environment.apiUrl}/images`);
    }
}
