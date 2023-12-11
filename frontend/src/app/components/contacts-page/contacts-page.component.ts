import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {SocialLinksService} from "../../services/social-links.service";
import {SocialLink} from "../../models/socialLinks";
import {take} from "rxjs";

@Component({
    selector: 'app-contacts-page',
    templateUrl: './contacts-page.component.html',
    styleUrls: ['./contacts-page.component.sass']
})

export class ContactsPageComponent implements OnInit {
    readonly APIUrl = "http://localhost:3000/api/";
    socialLinks: SocialLink[] = [];
    feedbackForm!: FormGroup;
    submitted: boolean = false;
    isSocialLinksLoading: boolean = true;

    constructor(
        private socialLinksService: SocialLinksService,
        private formBuilder: FormBuilder,
        private http: HttpClient
    ) { }

    get feedback() {
        return this.feedbackForm.controls;
    }

    get Email() {
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
            } catch {
                console.warn('Your feedback has NOT been submitted');
            }
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.feedbackForm.invalid) {
            return;
        }

        this.postFeedback(this.feedbackForm);
        this.submitted = false;
        this.feedbackForm.reset();
    }

    ngOnInit() {
        this.socialLinksService.getSocialLinks().pipe(take(1)).subscribe((socialLinks: SocialLink[]) => {
            this.socialLinks = socialLinks;
            this.isSocialLinksLoading = false;
        });

        this.feedbackForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });
    }
}
