/// <reference path="../../typings/main.d.ts" />

import {assert} from "chai";
import {Foo} from "../common/foo";
import {Bar} from "../common/bar";
import * as proxyquire from "proxyquire";


describe("server side test => foo", () => {

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

    it("getInt", () => {

        var excepted = 456;
        var isGetNumberBeCalledCount = 0;
        var fooProxy = proxyquire("../common/foo", {
            "./bar": {
                Bar:
                class BarSub {

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


});