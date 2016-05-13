/// <reference path="../../../../typings/main.d.ts" />

import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";

import * as request from "supertest";

var mockgoose = require("mockgoose");
import {DbContext} from "../../../nodejs/core/common/dbContext";

import {AppHelper} from "../../../shareware/appHelper";
import {InitRouter} from "./../../../nodejs/web/initRouter";

import * as exp from "express";
var app = exp();

describe("homecontroller", () => {

	var sandbox: Sinon.SinonSandbox;
    var mydb: DbContext;

    beforeEach(async () => {

        mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
        sandbox = sinon.sandbox.create();

    });

    afterEach(async () => {

        sandbox.restore();
        await mydb.closeAsync();

    });

	InitRouter(app);

	it("HomeController.apiAsync", async () => {

		var exp = {
            title: "myApp Title",
            asyncContent: "Bibby_Foo"
        };

		var p = new Promise<{
			title: string,
			asyncContent: string
		}>((resolve, reject) => {

			request(app)
				.get("/api")
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, (err, res) => {

					if (err) {
						reject(err);
						return;
					}
					resolve(res.body);

				});

		});

		var obj = await p;
		
		assert.equal(obj.title, exp.title);
		assert.equal(obj.asyncContent, exp.asyncContent);

	});

	it("supertest", async () => {

		app.get('/supertest', function (req, res) {
			var obj = { name: 'tobi' };
			res.status(200)
				.json(obj);
		});

		var p = new Promise<{ name: string }>((resolve, reject) => {

			request(app)
				.get('/supertest')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, (err, res) => {

					if (err) {
						reject(err);
						return;
					}

					resolve(res.body);
				});

		});

		var exp = "tobi";
		var obj = await p; //await httpMock();

		assert.equal(obj.name, exp);

	});



});