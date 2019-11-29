import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import axios from 'axios';
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { environment } from '../../environments/environment';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  constructor(
    @Inject(WINDOW) private window: Window,
    private route: ActivatedRoute,
    public util: UtilService
  ) { }

  listProduct: any = [{
    id: null,
    name: null,
    description: null,
    image: null,
    price: null,
    carbonhydrates: null,
    protein: null,
    lipid: null,
    xenluloza: null,
    canxi: null,
    iron: null,
    zinc: null,
    vitaminA: null,
    vitaminB: null,
    vitaminC: null,
    vitaminD: null,
    vitaminE: null,
    calorie: null,
    weight: null,
    categories: null,
    cateId: null
  }];
  API_COMBO = `${environment.api_url}/api/combo/`;

  id: number;
  public getSet: Function = async => {
    this.id = this.util.getIDfromURL(this.route.snapshot.params['id']);
    const that = this;
    axios.get(`${that.API_COMBO}${that.id}`).then(function (response) {
      that.listProduct = response.data.data.foods;
    }).catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  productImage: any ="assets/img/product/product-details-img1.jpg";

  changeProductImage(img) {
    this.productImage = img;
  }

  ngOnInit() {
    this.getSet();
  }
}
