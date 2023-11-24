import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SocialLinksService } from "../../services/social-links.service";
import { SocialLink } from "../../models/socialLinks";
import {take} from "rxjs";

@Component({
    selector: 'app-contacts-page',
    templateUrl: './contacts-page.component.html',
    styleUrls: ['./contacts-page.component.sass']
})
export class ContactsPageComponent implements OnInit {
    readonly APIUrl = "http://localhost:3000/api/";

    socialLinks: SocialLink[] = [];

    constructor(
        private socialLinksService: SocialLinksService,
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) { }

    feedbackForm: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        message: ['', Validators.required]
    });

    postFeedback(feedback: FormGroup) {
        const fbToPost: any = {
            name: feedback.controls['name'].value,
            email: feedback.controls['email'].value,
            message: feedback.controls['message'].value
        };

        console.log(fbToPost);

        this.http.post(this.APIUrl + 'feedbacks/AddFeedback', fbToPost).subscribe(res => {
            try {
                console.warn('Your feedback has been submitted');
                console.log(fbToPost);
            }
            catch {
                console.warn('Your feedback has NOT been submitted');
            }
        });

        this.feedbackForm.reset();
    }

    onSubmit() {
        this.postFeedback(this.feedbackForm);
    }

    isSocialLinksLoading: boolean = true;
    ngOnInit() {
        this.socialLinksService.getSocialLinks().pipe(take(1)).subscribe((socialLinks: SocialLink[]) => {
            this.socialLinks = socialLinks;
            this.isSocialLinksLoading = false;
        });
    }
}
