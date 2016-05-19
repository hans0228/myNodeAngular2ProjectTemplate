/// <reference path="../../typings/main.d.ts" />
import "reflect-metadata";

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "./../shareware/appHelper";


import {Bar} from "../shareware/bar";
import {Foo} from "../shareware/foo";

var sandbox: Sinon.SinonSandbox;

before((done: MochaDone) => {

    sandbox = sinon.sandbox.create();
    //mockgoose.reset();
    done();

});

after((done: MochaDone) => {

    sandbox.restore();
    //mockgoose.reset();
    done();

});

describe(`Feature: test easy class`, () => {

    describe(`Scenario: Test the method of getName.`, () => {

        var f: Foo;
        var act: string;

        it(`Given: Prepare the Foo class.`, () => {

            f = new Foo();

        });
        it(`When: Exectute the method of getName.`, () => {

            act = f.getName();

        });
        it(`Then: The result equal "Bibby_Foo"`, () => {

            var expected = "Bibby_Foo";
            assert.equal(act, expected);

        });

    });

    describe(`Scenario: Test the async method of getNameAsync.`, () => {

        var f: Foo;
        var act: string;

        it(`Given: Prepare the Foo class.`, () => {

            f = new Foo();

        });
        it(`When: Exectute the method of getNameAsync.`, async () => {

            act = await f.getNameAsync();

        });
        it(`Then: The result equal "Bibby_Foo"`, () => {

            var expected = "Bibby_Foo";
            assert.equal(act, expected);

        });

    });

    describe(`Scenario: Use the proxyquire to test the method of getInt.`, () => {

        let isGetNumberBeCalledCount = 0;
        let foo: Foo;
        let act: number;

        it(`Given: Prepare the fooproxy to fake the Bar.getNumber`, () => {

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
        it(`When: Execute the method of foo.getInt`, () => {

            act = foo.getInt();

        });
        it(`Then: the result equal 456 and the count of Bar.getNumber is one.`, () => {

            let excepted = 456;

            assert.equal(act, excepted);
            assert.equal(isGetNumberBeCalledCount, 1);

        });

    });

    describe(`Scenario: Use the sinon to test the method of getInt.`, () => {

        let isGetNumberBeCalledCount = 0;
        let foo: Foo;
        let act: number;
        let stubBar: Sinon.SinonStub;

        it(`Given: Prepare the fooproxy to fake the Bar.getNumber`, () => {

            stubBar = sandbox.stub(Bar.prototype, "getNumber")
                .returns(0);


        });
        it(`When: Execute the method of foo.getInt`, () => {

            var foo = new Foo();
            act = foo.getInt();

        });
        it(`Then: the result equal 456 and the count of Bar.getNumber is one.`, () => {

            var expected = 0;
            assert.equal(act, expected);
            assert.equal(stubBar.callCount, 1);

        });

    });

});