import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.sass']
})

export class ContactsPageComponent {
  readonly APIUrl = "http://localhost:3000/api/";

  constructor(
    private http: HttpClient,
    private fromBuilder: FormBuilder
    ) { }

  feedbackForm: FormGroup = this.fromBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required]
  });

  postFeedback(feedback: FormGroup){
    const fbToPost: any = {
      name: String = feedback.controls['name'].value,
      email: String =  feedback.controls['email'].value,
      message: String = feedback.controls['message'].value
    }
    console.log(fbToPost);
    this.http.post(this.APIUrl+'feedbacks/AddFeedback', fbToPost).subscribe(res => {
      try{
        console.warn('Your feedback has been submitted');
        console.log(fbToPost);
      }
      catch{
        console.warn('Your feedback has NOT been submitted');
      }
    })
    this.feedbackForm.reset();
  }

  onSubmit(){
    this.postFeedback(this.feedbackForm);
  }

  socialLinks: any=[];

  refreshItems () {
      this.http.get(this.APIUrl+'socialLinks/GetSocialLinks').subscribe(data=>{
          this.socialLinks=data;
      })
  }

  ngOnInit() {
      this.refreshItems ();
  }
}
