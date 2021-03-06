import { inject, NewInstance } from 'aurelia-framework';
import { ConfiguredHttpClient } from 'core/configured-http-client';
import { HttpClient } from 'aurelia-fetch-client';
import { handleApiError } from 'core/common';
import { DemandeAConsulterItem } from '../models/demande-a-consulter-item';
import { DemandeAValiderItem } from '../models/demande-a-valider-item';
import { PrioriteAGererItem } from '../models/priorite-a-gerer-item';

@inject(ConfiguredHttpClient, NewInstance.of(HttpClient))
export class SampleService {

  /**
   * Create an instance of the class.
   * @param {ConfiguredHttpClient} configuredhttpclient - le client http configuré pour la Web API.
   * @param {HttpClient} httpclient - le client http fetch standard.
   */
  constructor(configuredhttpclient, httpclient) {
    this._client = configuredhttpclient.httpClient;
    this._localClient = httpclient;
  }

  /**
   * Efface le cache des autorisations.
   * @return {Promise} - la réponse http
   */
  effacerCacheAutorisations() {
    const url = '/backoffice/1.0/cache/autorisations';
    return this._client
      .fetch(url, { method: 'DELETE' })
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getLogements() {
    return this._localClient
      .fetch('/mock/logements.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getCommunes() {
    return this._localClient
      .fetch('/mock/communes.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getReseauFerre() {
    return this._localClient
      .fetch('/mock/reseau.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getContactPriviligies(entreprise) {
    return this._localClient
      .fetch('/mock/contactprivilegie.json')
      .then(response => response.json())
      .then(result => result.filter(item => {if (item.idEntreprise === entreprise) return item;}))
      .catch(error => handleApiError(error));
  }

  getDetailsDemandeAvecCerfa() {
    return this._localClient.fetch('/mock/details-demande-avec-cerfa.json')
      .then(response => response.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => handleApiError(error));
  }

  getDetailsDemandeSansCerfa() {
    return this._localClient.fetch('/mock/details-demande-sans-cerfa.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getDemandesAConsulter() {
    return this._localClient
      .fetch('/mock/demandes-a-consulter.json')
      .then(response => response.json())
      .then(results => {
        return results.map(v => DemandeAConsulterItem.fromObject(v));
      })
      .catch(error => handleApiError(error));
  }

  getLogementAConsulter() {
    return this._localClient
      .fetch('/mock/logements-a-consulter.json')
      .then(response => response.json())
      .then(results => {
        return results.map(v => DemandeAConsulterItem.fromObject(v));
      })
      .catch(error => handleApiError(error));
  }

  getConventionFinancementAConsulter() {
    return this._localClient
      .fetch('/mock/convention-financement-a-consulter.json')
      .then(response => response.json())
      .then(results => {
        return results.map(v => DemandeAConsulterItem.fromObject(v));
      })
      .catch(error => handleApiError(error));
  }

  getDemandesAValider() {
    return this._localClient
      .fetch('/mock/demandes-a-valider.json')
      .then(response => response.json())
      .then(results => {
        return results.map(v => DemandeAValiderItem.fromObject(v));
      })
      .catch(error => handleApiError(error));
  }

  getPrioritesAGerer() {
    return this._localClient
      .fetch('/mock/priorites-a-gerer.json')
      .then(response => response.json())
      .then(results => {
        return results.map(v => PrioriteAGererItem.fromObject(v));
      })
      .catch(error => handleApiError(error));
  }

  getFiltreEntreprise() {
    return this._localClient
      .fetch('/mock/entreprise.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getFiltreDepartement() {
    return this._localClient
      .fetch('/mock/departement.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getTypologie() {
    return this._localClient
      .fetch('/mock/typologie.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getOffresPrivileges() {
    return this._localClient
      .fetch('/mock/offres-privileges.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getOffresReporting() {
    return this._localClient
      .fetch('/mock/offres-reporting.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }

  getAccueilEntrepriseData() {
    return this._localClient
      .fetch('/mock/acceuilEntrepriseData.json')
      .then(response => response.json())
      .catch(error => handleApiError(error));
  }
}
