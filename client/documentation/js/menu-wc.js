'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">med-pet documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' : 'data-target="#xs-components-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' :
                                            'id="xs-components-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BannerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalendarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CeloComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CeloComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConsultaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConsultaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DesparasitacionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DesparasitacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetallesMascotaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetallesMascotaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EscogerMascotaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EscogerMascotaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FichaRegistroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FichaRegistroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ObservacionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ObservacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OlvidePassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OlvidePassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProximasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProximasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReiniciaPassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReiniciaPassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TablaCategoriasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TablaCategoriasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VacunaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VacunaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' : 'data-target="#xs-directives-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' :
                                        'id="xs-directives-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                        <li class="link">
                                            <a href="directives/DropZoneDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DropZoneDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' : 'data-target="#xs-injectables-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' :
                                        'id="xs-injectables-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MascotasService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MascotasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsuariosService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' : 'data-target="#xs-pipes-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' :
                                            'id="xs-pipes-links-module-AppModule-e5208fa4da4eb3ce9259d621db672c40"' }>
                                            <li class="link">
                                                <a href="pipes/FileSizePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FileSizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppRoutingModule-12561bfb9baa65430f9d9c36722a9816"' : 'data-target="#xs-injectables-links-module-AppRoutingModule-12561bfb9baa65430f9d9c36722a9816"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppRoutingModule-12561bfb9baa65430f9d9c36722a9816"' :
                                        'id="xs-injectables-links-module-AppRoutingModule-12561bfb9baa65430f9d9c36722a9816"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Celo.html" data-type="entity-link">Celo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Consulta.html" data-type="entity-link">Consulta</a>
                            </li>
                            <li class="link">
                                <a href="classes/Desparasitacion.html" data-type="entity-link">Desparasitacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mascota.html" data-type="entity-link">Mascota</a>
                            </li>
                            <li class="link">
                                <a href="classes/Observacion.html" data-type="entity-link">Observacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Vacuna.html" data-type="entity-link">Vacuna</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CelosService.html" data-type="entity-link">CelosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConsultaService.html" data-type="entity-link">ConsultaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DesparasitacionService.html" data-type="entity-link">DesparasitacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MascotasService.html" data-type="entity-link">MascotasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ObservacionService.html" data-type="entity-link">ObservacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link">UsuariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VacunasService.html" data-type="entity-link">VacunasService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link">TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenResponse.html" data-type="entity-link">TokenResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDetails.html" data-type="entity-link">UserDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});