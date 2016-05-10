/// <reference path="../../typings/main.d.ts" />
import "reflect-metadata";

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {Bar} from "../shareware/bar";
import {Foo} from "../shareware/foo";

describe("server side test => foo", () => {

    var sandbox: Sinon.SinonSandbox;

    beforeEach((done: MochaDone) => {

        sandbox = sinon.sandbox.create();
        //mockgoose.reset();
        done();

    });

    afterEach((done: MochaDone) => {

        sandbox.restore();
        //mockgoose.reset();
        done();

    });

    it("getName", () => {

        var expected = "Bibby_Foo";
        var f = new Foo();

        var actual = f.getName();

        assert.equal(actual, expected);

    });

    it("getNameAsync", async () => {

        var expected = "Bibby_Foo";
        var f = new Foo();

        var actual = await f.getNameAsync();

        assert.equal(actual, expected);

    });

    it("getInt, proxyquire", () => {

        var excepted = 456;
        var isGetNumberBeCalledCount = 0;
        var fooProxy = proxyquire("../shareware/foo", {
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

        var v: Foo = new fooProxy.Foo();
        var actual = v.getInt();
        assert.equal(actual, excepted);
        assert.equal(isGetNumberBeCalledCount, 1);

    });

    it("getInt, sinon", () => {

        var expected = 0;
        var stubBar = sandbox.stub(Bar.prototype, "getNumber")
            .returns(0);

        var foo = new Foo();
        var actual = foo.getInt();

        assert.equal(actual, expected);
        assert.equal(stubBar.callCount, 1);

    });


});