/// <reference path="../../typings/index.d.ts" />
import "reflect-metadata";

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "./../shareware/appHelper";

import {Bar} from "../shareware/bar";
import {Foo} from "../shareware/foo";

let sandbox: Sinon.SinonSandbox;
var prepareToRun = (_self, tag: string) => {
	_self.Before({ tags: [tag] }, (scenario: any) => {
		sandbox = sinon.sandbox.create();
	});
	_self.After({ tags: [tag] }, (scenario) => {
		sandbox.restore();
	});
};

export =function () {

	prepareToRun(this, "@testeasyclass");

	let f: Foo;
	let actString: string;
	this.Given(/^Prepare the Foo class\.$/, function () {

		f = new Foo();

	});

	this.When(/^Exectute the method of getName\.$/, function () {

		actString = f.getName();

	});

	this.Then(/^The result equal "([^"]*)"\.$/, function (exp) {

		assert.equal(actString, exp);

	});

	this.When(/^Exectute the method of getNameAsync\.$/, async function () {

		actString = await f.getNameAsync();

	});

	let isGetNumberBeCalledCount: number;
	let foo: Foo;
	let actNumber: number;
	let stubBar: Sinon.SinonStub;

	this.Given(/^Prepare the proxy of foo to fake the Bar\.getNumber\.$/, function () {

		isGetNumberBeCalledCount = 0;
		var fooFake = proxyquire("../shareware/foo", {
			"../shareware/bar": {
				Bar:
				class BarStub {

					getNumber() {
						isGetNumberBeCalledCount++;
						return 456;
					}

				}

			}
		});

		foo = new fooFake.Foo();

	});

	this.Given(/^Prepare the proxy of sinon to fake the Bar\.getNumber\.$/, function () {

		isGetNumberBeCalledCount = 0;
		sandbox = sinon.sandbox.create();
		stubBar = sandbox.stub(Bar.prototype, "getNumber")
			.returns(0);

	});

	this.When(/^Execute the method of foo\.getInt\.$/, function () {

		actNumber = foo.getInt();

	});
	this.Then(/^the result equal (\d+) and the count of Bar\.getNumber is one\.$/, function (exp) {

		assert.equal(actNumber, exp);
		assert.equal(isGetNumberBeCalledCount, 1);

	});

}