/// <reference path="../../../../typings/browser.d.ts" />

import "reflect-metadata";

import {Injector, provide} from "angular2/core";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "angular2/http";
import {MockBackend, MockConnection} from "angular2/http/testing";
import {RouteConfig, Router, ROUTER_DIRECTIVES, RouteRegistry} from "angular2/router";
import {NgZone} from "angular2/src/core/zone/ng_zone";

import {assert} from "chai";
import * as sinon from "sinon";

import {HomeComponent} from "../../../client/scripts/home/HomeComponent";

describe("client side test => HomeComponent", () => {

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

        var jj = Injector.resolveAndCreate([

            HomeComponent,

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


    it("showGreetLog", () => {

        var expected = "Hello, Bibby";

        var h: HomeComponent = injector.get(HomeComponent);
        h.showGreetLog("Bibby");

        assert.equal(h.Wording, expected);

    });


});