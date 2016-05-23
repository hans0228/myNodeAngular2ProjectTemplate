/// <reference path="../../typings/index.d.ts" />
import "reflect-metadata";

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "./../shareware/appHelper";

import {Bar} from "../shareware/bar";
import {Foo} from "../shareware/foo";

let sandbox: Sinon.SinonSandbox;

export =function () {

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
	let act: number;
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

		act = foo.getInt();

	});
	this.Then(/^the result equal (\d+) and the count of Bar\.getNumber is one\.$/, function (exp) {

		assert.equal(act, exp);
		assert.equal(isGetNumberBeCalledCount, 1);

	});

}










// /// <reference path="../../typings/index.d.ts" />
// import "reflect-metadata";

// import {assert} from "chai";
// import * as sinon from "sinon";
// import * as proxyquire from "proxyquire";
// import {AppHelper} from "./../shareware/appHelper";

// import {Bar} from "../shareware/bar";
// import {Foo} from "../shareware/foo";

// let sandbox: Sinon.SinonSandbox;
// let prepareToRun = () => {
//     before(async (done: MochaDone) => {

//         sandbox = sinon.sandbox.create();
//         done();

//     });
//     after(async (done: MochaDone) => {

//         sandbox.restore();
//         done();

//     });
// };

// describe(`Feature: test easy class`, () => {

//     describe(`Scenario: Test the method of getName.`, () => {

//         prepareToRun();

//         var f: Foo;
//         var act: string;

//         it(`Given: Prepare the Foo class.`, () => {

//             f = new Foo();

//         });
//         it(`When: Exectute the method of getName.`, () => {

//             act = f.getName();

//         });
//         it(`Then: The result equal "Bibby_Foo"`, () => {

//             var expected = "Bibby_Foo";
//             assert.equal(act, expected);

//         });

//     });

//     describe(`Scenario: Test the async method of getNameAsync.`, () => {

//         prepareToRun();

//         var f: Foo;
//         var act: string;

//         it(`Given: Prepare the Foo class.`, () => {

//             f = new Foo();

//         });
//         it(`When: Exectute the method of getNameAsync.`, async () => {

//             act = await f.getNameAsync();

//         });
//         it(`Then: The result equal "Bibby_Foo"`, () => {

//             var expected = "Bibby_Foo";
//             assert.equal(act, expected);

//         });

//     });

//     describe(`Scenario: Use the proxyquire to test the method of getInt.`, () => {

//         prepareToRun();

//         let isGetNumberBeCalledCount = 0;
//         let foo: Foo;
//         let act: number;

//         it(`Given: Prepare the fooproxy to fake the Bar.getNumber`, () => {

//             var fooFake = proxyquire("../shareware/foo", {
//                 "../shareware/bar": {
//                     Bar:
//                     class BarStub {

//                         getNumber() {
//                             isGetNumberBeCalledCount++;
//                             return 456;
//                         }

//                     }

//                 }
//             });

//             foo = new fooFake.Foo();

//         });
//         it(`When: Execute the method of foo.getInt`, () => {

//             act = foo.getInt();

//         });
//         it(`Then: the result equal 456 and the count of Bar.getNumber is one.`, () => {

//             let excepted = 456;

//             assert.equal(act, excepted);
//             assert.equal(isGetNumberBeCalledCount, 1);

//         });

//     });

//     describe(`Scenario: Use the sinon to test the method of getInt.`, () => {

//         prepareToRun();

//         let isGetNumberBeCalledCount = 0;
//         let foo: Foo;
//         let act: number;
//         let stubBar: Sinon.SinonStub;

//         it(`Given: Prepare the fooproxy to fake the Bar.getNumber`, () => {

//             stubBar = sandbox.stub(Bar.prototype, "getNumber")
//                 .returns(0);


//         });
//         it(`When: Execute the method of foo.getInt`, () => {

//             var foo = new Foo();
//             act = foo.getInt();

//         });
//         it(`Then: the result equal 456 and the count of Bar.getNumber is one.`, () => {

//             var expected = 0;
//             assert.equal(act, expected);
//             assert.equal(stubBar.callCount, 1);

//         });

//     });

// });