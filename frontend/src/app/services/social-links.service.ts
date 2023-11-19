import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SocialLink} from "../models/socialLinks";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {

  constructor(private httpClient:HttpClient) { }

    getSocialLinks(): Observable<SocialLink[]> {
      const url = "http://localhost:3000/api/socialLinks/GetSocialLink"
      const mockUrl = 'assets/mocks/socialLinks.json';

      return this.httpClient.get<SocialLink[]>(url);

    }
}
