/// <reference path="../../../../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HomeComponent} from "../../../systemjs/client/scripts/home/HomeComponent"; //server side
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(HomeComponent, [
	HTTP_PROVIDERS
]);


