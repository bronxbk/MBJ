export class ConsulterDemandes {
  statuts = ['Incomplète', 'Satisfaite', 'Annulée', 'En cours'];
  nbrCandidature;
  nbreRefusEnCal;
  nbreRefusParClientEnCal;
  dmdPrioritaire;
  dmdPrioritaireOui;
  dmdPrioritaireNon;
  salarieCoache;
  fromDate;
  toDate;
  nom;
  prenom;
  dateNaissance;
  matricule;

  resultats = [];

  currentPage = 1;
  pageSize = 5;

  constructor(service) {
    this._service = service;
  }

  activate() {
    this._service.getDemandesAConsulter().then(res => this.resultats = res);
  }

  search() {
    this._service.getDemandesAConsulter().then(res => {
      if (this.selectedStatut !== 'Sélectionner...') {
        res = res.filter(m => m.statuts === this.selectedStatut);
      }
      if (this.nbrCandidature) {
        res = res.filter(m => m.nbrCandidature === this.nbrCandidature);
      }
      if (this.nbreRefusEnCal) {
        res = res.filter(m => m.refusCal === this.nbreRefusEnCal);
      }
      if (this.nbreRefusParClientEnCal) {
        res = res.filter(m => m.refusSalarie === this.nbreRefusParClientEnCal);
      }
      if (this.nom) {
        res = res.filter(m => m.nom.toLowerCase().indexOf(this.nom.toLowerCase()) > -1);
      }
      if (this.prenom) {
        res = res.filter(m => m.prenom.toLowerCase().indexOf(this.prenom.toLowerCase()) > -1);
      }
      if (this.dateNaissance) {
        res = res.filter(m => m.dateNaissance === this.dateNaissance);
      }
      if (this.matricule) {
        res = res.filter(m => m.matricule.toLowerCase().indexOf(this.matricule.toLowerCase()) > -1);
      }
      if (this.dmdPrioritaire !== null) {
        res = res.filter(m => m.dmdPrio === this.dmdPrioritaire);
      }
      if (this.fromDate) {
        let fromDate = new Date(this.fromDate);
        res = res.filter(m=> new Date(m.dateDemande) >= fromDate);
      }
      if (this.toDate) {
        let toDate = new Date(this.toDate);
        res = res.filter(m=> new Date(m.dateDemande) <= toDate);
      }
      this.resultats = res;
    });
  }

  handleClick(val) {
    if (this.dmdPrioritaire === val) {
      this.dmdPrioritaire = null;
      this.dmdPrioritaireOui = this.dmdPrioritaire;
      this.dmdPrioritaireNon = this.dmdPrioritaire;
    }
    else {
      this.dmdPrioritaire = val; // toggle clicked true/false
      this.dmdPrioritaireOui = (val);
      this.dmdPrioritaireNon = (!this.dmdPrioritaireOui);
    }
    return true; // only needed if you want to cancel preventDefault()
  }
}
