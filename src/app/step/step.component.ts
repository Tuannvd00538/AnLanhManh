import { Component, OnInit, Inject } from '@angular/core';
import axios from 'axios';
import { WINDOW, LOCAL_STORAGE } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) { }
  textError: any = null;

  API_PROFILE = `${environment.api_url}/api/user-profile/create`;

  API_Benhly = `${environment.api_url}/api/category/parent/5`;

  API_GETME = `${environment.api_url}/api/auth/me`;

  API_UpdateCate = `${environment.api_url}/api/user-profile/{id_profile}/category`;

  currentStep: any = 1;

  token = this.localStorage.getItem('token');

  listBenhly: any;

  myInfo: any;

  userDetails: any;

  changeStep(step) {
    this.currentStep = step;
    console.log(this.currentStep);
  }

  goHome() {
    this.window.location.href = '/';
  }

  data = {
    height: null,
    weight: null,
    age: null,
    exerciseIntensity: 1.2,
    gender: 1,
    status: 1,
    bodyFat: 0
  }

  arrBl: any = [];
  public changeModel(ev, id) {
    if (id == 0) {
      this.arrBl = [];
    }
    if (ev.target.checked) {
      this.arrBl.push(id);
      if (id == 0) {
        this.arrBl = [];
      }
    } else {
      let i = this.arrBl.indexOf(id);
      this.arrBl.splice(i, 1);
    }
  }


  public getBenhly: Function = () => {
    const that = this;
    axios.get(that.API_Benhly)
      .then(function (response) {
        that.listBenhly = response.data.data;
        //console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getLatestProfile() {
    const that = this;
    axios.get(`${environment.api_url}/api/user-profile/latest`, { headers: { Authorization: that.token } })
      .then(function (response) {
        console.log(response.data.data);
        that.userDetails = response.data.data;
      })
      .catch(function (error) {
        //console.log(error);
      })
  }

  validateStep() {
    const that = this;
    var invalid = true;
    // validate here

    // validate step 1
    if (this.currentStep == 1) {
      if (this.data.height && this.data.weight && this.data.age) {
        that.textError = null;
      } else {
        that.textError = "Vui lòng nhập đầy đủ thông tin !";
        return;
      }
    }

    if (this.currentStep == 3) {
      if (this.data.bodyFat != null) {
        axios.post(that.API_PROFILE, that.data, { headers: { Authorization: that.token } }).then(function (response) {
          that.userDetails = response.data.data;
          console.log(that.userDetails);
          axios.put(`${environment.api_url}/api/user-profile/${that.userDetails.id}/category`, that.arrBl, { headers: { Authorization: that.token } }).then(function (res) {
            that.currentStep = that.currentStep + 1;
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
        //that.updateCate();
        that.textError = null;
      } else {
        that.textError = "Vui lòng nhập đầy đủ thông tin !";
        return;
      }
    }

    if (this.currentStep == 4) {
      return;
    } else if(this.currentStep != 3){
      this.currentStep = this.currentStep + 1;
    }
  }

  endStep() {
    window.location.href = '/';
  }

  ngOnInit() {
    if (this.token == null || this.token == undefined) {
      this.window.location.href = '/login'
    }
    this.getBenhly();
  }
}
