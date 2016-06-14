/// <reference path="../../../../typings/index.d.ts" />

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

let mydb: DbContext;
let sandbox: Sinon.SinonSandbox;
let app;
var prepareToRun = (_self, tag: string) => {
    _self.Before({ tags: [tag] }, async (scenario: any) => {
		mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
		sandbox = sinon.sandbox.create();

		app = exp();
		InitRouter(app);

    });
    _self.After({ tags: [tag] }, async (scenario) => {
		await mydb.closeAsync();
		sandbox.restore();

		app = null;

    });
};

export = function () {

	prepareToRun(this, "@11468db6-e307-4cd6-8fdb-6812285d596d");

	let fakeApiRequest: Promise<{
		title: string,
		asyncContent: string
	}>;
	let fakeApiAct: {
		title: string,
		asyncContent: string
	};

	let superFakeRequest: Promise<{
		name: string
	}>;
	let superAct: {
		name: string
	};


	this.Given(/^Prepare the fake request\.$/, function () {

		fakeApiRequest = new Promise<{
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

	this.When(/^Exectue the fake request\.$/, async function () {

		fakeApiAct = await fakeApiRequest;

	});

	this.Then(/^The result of title and asyncContent are "([^"]*)" and "([^"]*)"\.$/, function (title, content) {

		var exp = {
			title: title,
			asyncContent: content
		};

		assert.equal(fakeApiAct.title, exp.title);
		assert.equal(fakeApiAct.asyncContent, exp.asyncContent);

	});

	this.Given(/^Prepare the supertest fake request\.$/, function () {

		app.get('/supertest', function (req, res) {
			var obj = { name: 'tobi' };
			res.status(200)
				.json(obj);
		});

		superFakeRequest = new Promise<{ name: string }>((resolve, reject) => {

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

	this.When(/^Exectue the super fake request\.$/, async function () {

		superAct = await superFakeRequest;

	});

	this.Then(/^The result of name is "([^"]*)"$/, function (name) {

		assert.equal(superAct.name, name);

	});

};
