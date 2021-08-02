import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { forbiddenNameValidator } from './shared/first-name.validator';
import { passwordValidator } from './shared/password.validator';
import { CommonModule } from '@angular/common';
import { UserService } from './shared/service/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm!: FormGroup;

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get phoneNumber(){
    return this.registrationForm.get('phoneNumber');
  }

  constructor(private fb: FormBuilder,private userService:UserService){}

  ngOnInit(){

    // this.userService.list()
    // .subscribe(res=>{
    //   console.log(res);
    // });
    // this.userService.post()
    // .subscribe(postuser=>{
    //   console.log(postuser);
    // });
    // this.userService.put()
    // .subscribe(update=>{
    //   console.log(update);
    // });
    // this.userService.delete()
    // .subscribe(del=>{
    //   console.log(del);
    // });

    

  this.registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    lastName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(5)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  }, {Validator: passwordValidator});

  this.registrationForm.get('subscribe')!.valueChanges 
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
          if (checkedValue){
            email!.setValidators(Validators.required);
          } else {
            email!.clearValidators();
          }
          email!.updateValueAndValidity();
      });
}

//  registrationForm = new FormGroup({
//    firstName: new FormControl('Hemangi'),
//    lastName: new FormControl(''),
//    email: new FormControl(''),
//    phoneNumber: new FormControl(''),
//    password: new FormControl(''),
//    confirmPassword: new FormControl(''),
//    address: new FormGroup({
//      city: new FormControl(''),
//      state: new FormControl(''),
//      postalCode: new FormControl('')
//    }) 
//  });

  loadApiData(){
    this.registrationForm.patchValue({
      firstName: 'Hemangi',
      lastName: 'Pandya',
      email: '123@gmail.com',
      phoneNumber: '548988498',
      password: 'test',
      confirmPassword: 'test',
      address:{
      city: 'City',
      state: 'State',
      postalCode: '354446'
      }
    });
  }
  onSubmit(){
    var user={
      firstName:this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      phoneNumber: this.phoneNumber?.value
    }
    this.userService.register(user).subscribe(
      res => {},
      err => {
        console.log(err);
      }
    );
  }
}
