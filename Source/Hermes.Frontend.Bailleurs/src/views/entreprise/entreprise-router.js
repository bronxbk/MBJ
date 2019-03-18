export class EntrepriseRouter {

  configureRouter(config, router) {
    config.map([
      { route: ['', 'accueil'], name: 'accueil', moduleId: './accueil-entreprise', nav: true, title: 'Accueil' },
      { route: 'pE2_1', name: 'pE2_1', moduleId: './pE2_1', nav: true, title: 'pE2_1' },
      { route: 'details-demande-sans-CERFA',  name: 'details-demande-sans-CERFA', moduleId: './details-demande-sans-CERFA', nav: true, title: 'Details demande sans CERFA'  },
      { route: 'details-demande-avec-CERFA',  name: 'details-demande-avec-CERFA', moduleId: './details-demande-avec-CERFA', nav: true, title: 'Details demande avec CERFA' },
      { route: 'Entreprise', name: 'Entreprise', moduleId: 'entreprise-router', nav: true, title: 'entreprise Router' },
      { route: 'gestion-demandes', name: 'gestion-demandes', moduleId: './gestion-demandes', nav: true, title: 'Gestion des demandes' }

    ]);

    this.router = router;
  }

}
