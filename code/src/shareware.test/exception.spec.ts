/// <reference path="../../typings/main.d.ts" />

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";

describe("  server side test => exception", () => {

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

    it("test, exception", () => {

        var expected = "xxxxx";

        try {

            throw "xxxxx";

        } catch (ex) {

            var actual = ex;
            assert.equal(actual, expected);

        }
    });

    it("test, exception from promise", async () => {

        var expected = "xxxxx1";

        var f = () => {

            var p = new Promise<void>((resolve, reject) => {

                setTimeout(() => {

                    try {

                        throw "xxxxx1";

                    } catch (ex) {

                        reject(ex);

                    }

                }, 500);

            });
            return p;

        }

        try {

            await f();

        } catch (ex) {

            var actual =ex;
            assert.equal(actual, expected);

        }

    });


});