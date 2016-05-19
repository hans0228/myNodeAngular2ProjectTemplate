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

describe(`Features: HomeComponent is the first component in the client side.`, () => {

    let sandbox: Sinon.SinonSandbox;
    let injector: Injector;

    beforeEach((done: MochaDone) => {

        sandbox = sinon.sandbox.create();
        injector = getInjector();
        done();

    });

    afterEach((done: MochaDone) => {

        sandbox.restore();
        injector = null;
        done();

    });

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

    describe(`Scenario: show greet wording.`, () => {

        let homeComponent: HomeComponent;

        it(`Given: I am in the HomeComponent.`, () => {

            homeComponent = injector.get(HomeComponent);

        });
        it(`When: I call the showGreetLog method and put the "Bibby".`, () => {

            homeComponent.showGreetLog("Bibby");

        });
        it(`Then: I should see the homeComponent.Wording is "Hello, Bibby"`, () => {

            var expected = "Hello, Bibby";
            assert.equal(homeComponent.Wording, expected);

        });

    });

    describe(`Scenario: show greet wording .`, () => {

        let homeComponent: HomeComponent;

        it(`Given: I am in the HomeComponent.`, () => {

            homeComponent = injector.get(HomeComponent);

        });
        it(`When: I call the showGreetLogAsync method.`, async () => {

            await homeComponent.showGreetLogAsync();

        });
        it(`Then: I should see the homeComponent.AsyncWording is "Hello, Bibby"`, () => {

            var expectedAsync = "Hello, Bibby async";
            assert.equal(homeComponent.AsyncWording, expectedAsync);

        });

    });

});