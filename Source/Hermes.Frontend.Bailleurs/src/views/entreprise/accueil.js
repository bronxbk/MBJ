import { inject } from 'aurelia-framework';
import { SampleService } from 'services/sample-service';

@inject(SampleService)
export class Acceuil {

  constructor(service) {
    this._service = service;
    this.names = [];
    this.offres = [];
  }

  activate(params, routeConfig, navigationInstruction) {
    this._service.getAccueilEntrepriseData().then((res) => {
      this.names = res.names;
      this.offres = res.offres;
    });
  }

}
