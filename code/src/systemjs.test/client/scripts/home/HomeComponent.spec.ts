/// <reference path="../../../../../typings/browser.d.ts" />

import "reflect-metadata";

import {Injector, provide, ReflectiveInjector} from "@angular/core";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";

import {assert} from "chai";
import * as sinon from "sinon";

import {HomeComponent} from "../../../../systemjs/client/scripts/home/HomeComponent";
import {HomeService} from "../../../../systemjs/client/scripts/home/HomeService";
import {AppHelper} from "./../../../../shareware/appHelper";

let sandbox: Sinon.SinonSandbox;
let injector: Injector;
var prepareToRun = (_self, tag: string) => {
    _self.Before({ tags: [tag] }, (scenario: any) => {
        sandbox = sinon.sandbox.create();
        injector = getInjector();
    });
    _self.After({ tags: [tag] }, (scenario) => {
        sandbox.restore();
        injector = null;
    });
};

var getInjector = () => {

    var jj = ReflectiveInjector.resolveAndCreate([

        HomeComponent,
        HomeService,

        // provide(Router, {
        //     useValue: new Router(new RouteRegistry(),)
        // }),
        //Router,
        //RouteRegistry,

        // provide(NgZone, {
        //     useValue: new NgZone({ enableLongStackTrace: false })
        // }),

        BaseRequestOptions,
        MockBackend,
        provide(Http, {
            useFactory: (backend, defaultOptions) => {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        })
    ]);
    return jj;

};
var setFakeConnection = () => {
    var backend: MockBackend = injector.get(MockBackend);
    var p = new Promise((resolve, reject) => {
        backend.connections.subscribe(c => {
            resolve(c);
        }, err => {
            reject(err);
        });
    });
    return p;
};
var setFakeResponse = (con: MockConnection, opts: ResponseOptions) => {
    con.mockRespond(new Response(opts));
};
var getHomeComponent = () => {
    var obj: HomeComponent = injector.get(HomeComponent);
    return obj;
};

export = function () {

    prepareToRun(this, "@bfa80860-bad5-4778-9015-8f31e8310071");

    let homeComponent: HomeComponent;

    this.Given(/^I am in the HomeComponent\.$/, function () {

        homeComponent = injector.get(HomeComponent);

    });

    this.When(/^I call the showGreetLog method and put the "([^"]*)"\.$/, function (name) {

        homeComponent.showGreetLog(name);

    });

    this.When(/^I call the showGreetLogAsync method\.$/, async function () {

        await homeComponent.showGreetLogAsync();

    });

    this.Then(/^I should see the homeComponent\. The wording is "([^"]*)"$/, function (exp) {

        assert.equal(homeComponent.Wording, exp);

    });

    this.Then(/^I should see the homeComponent\. The asyncWording is "([^"]*)"$/, function (exp) {

        assert.equal(homeComponent.AsyncWording, exp);

    });

};