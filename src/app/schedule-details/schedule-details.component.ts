import { Component, OnInit, Pipe } from '@angular/core';
import axios from "axios";
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { UtilService } from '../services/util.service';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.css']
})
@Pipe({name: 'keys'})
export class ScheduleDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public util: UtilService
  ) { }

  ngOnInit() {
    this.loadScheduleDetail();
  }

  dataSchedule: any;
  dataGroup: any;
  dataGet: any;
  id: number;
  loadScheduleDetail(){
    this.id = this.util.getIDfromURL(this.route.snapshot.params['id']);
    const that = this;
    axios.get(`${environment.api_url}/api/schedule-combo/schedule/${this.id}`)
      .then(function (response) {
        if(response.data.status == 200){
        that.dataSchedule = response.data.data;
        that.dataGroup = _.groupBy(that.dataSchedule, "day");
        let keys:any=[];
        for (let day in that.dataGroup) {
        keys.push({day:day, data:that.dataGroup[day]});
        }
        that.dataGet = keys;
        console.log(that.dataGet);
        }
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }
}
