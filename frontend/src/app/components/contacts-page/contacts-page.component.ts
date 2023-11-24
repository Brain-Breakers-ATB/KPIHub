import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]),
        message: new FormControl('', [Validators.required])
    });

    get Email(){
        return this.feedbackForm.get('email')
    }

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
