import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import uiBootstrap from 'angular-ui-bootstrap';

// css lib
import 'bootstrap/dist/css/bootstrap.min.css';

// css
import './styles/main.scss';
// components
import mainApp from './app';
import home from './components/home/home';
import login from './components/login/login';
import navbar from './components/navbar/navbar';
import redact from './components/redact/redact';
import profile from './components/profile/profile';
import about from './components/about/about';

// services
import appService from './app.service';

// routing
import routing from './app.route';

// directives

// constants
const MODULE_NAME = 'app';
require('../index.html');

angular.module(MODULE_NAME, [uiRouter, ngSanitize, uiBootstrap])
    // components
    .component('myApp', mainApp)
    .component('home', home)
    .component('login', login)
    .component('navbar', navbar)
    .component('redact', redact)
    .component('profile', profile)
    .component('about', about)
    .service('appService', appService)
    .config(routing)

export default MODULE_NAME;
