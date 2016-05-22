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

let sandbox: Sinon.SinonSandbox;
let mydb: DbContext;
let app;

let prepareToRun = () => {
    before(async (done: MochaDone) => {

        mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
        sandbox = sinon.sandbox.create();

		app = exp();
		InitRouter(app);

		done();

    });
    after(async (done: MochaDone) => {

        sandbox.restore();
        await mydb.closeAsync();
		
		app = null;
		
		done();

    });
};

describe("Feature: Homecontroller is the first backend controller.", () => {

	describe(`Scenario: test the api`, () => {

		prepareToRun();

		let fakeExected: Promise<{
			title: string,
			asyncContent: string
		}>;
		let act: {
			title: string,
			asyncContent: string
		};

		it(`Given: Prepare the fake request.`, () => {

			fakeExected = new Promise<{
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

		});
		it(`When: Exectue the fake request.`, async () => {

			act = await fakeExected;

		});
		it(`Then: The result of title and asyncContent are "myApp Title" and "Bibby_Foo"`, () => {

			var exp = {
				title: "myApp Title",
				asyncContent: "Bibby_Foo"
			};

			assert.equal(act.title, exp.title);
			assert.equal(act.asyncContent, exp.asyncContent);

		});

	})

	describe(`Scenario: test supertest`, () => {

		prepareToRun();

		let fakeRequest: Promise<{ name: string }>;
		let act: { name: string };

		it(`Given: Prepare the fake request.`, () => {

			app.get('/supertest', function (req, res) {
				var obj = { name: 'tobi' };
				res.status(200)
					.json(obj);
			});

			fakeRequest = new Promise<{ name: string }>((resolve, reject) => {

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

		});
		it(`When: Exectue the fake request.`, async () => {

			act = await fakeRequest;

		});
		it(`Then: The result of name is "tobi"`, () => {

			var exp = "tobi";
			assert.equal(act.name, exp);

		});

	});

});
