/// <reference path="../../typings/main.d.ts" />

import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";

let sandbox: Sinon.SinonSandbox;
let prepareToRun = () => {
    before(async (done: MochaDone) => {

        sandbox = sinon.sandbox.create();
        done();

    });
    after(async (done: MochaDone) => {

        sandbox.restore();
        done();

    });
};

describe(`Feature: try to catch the exceptions`, () => {

    describe(`Scenario: use "try catch" syntax to catch the excetpion`, () => {

        prepareToRun();

        let act: string;
        it(`When: Throw exception "xxx".`, () => {

            try {
                throw "xxxxx";
            } catch (ex) {
                act = ex;
            }

        });
        it(`Then: The result is xxx`, () => {

            var exp = "xxxxx";
            assert.equal(act, exp);

        });


    });

    describe(`Scenario: use "try catch" syntax to catch the async excetpion`, () => {

        prepareToRun();

        let p;
        let act: string;

        it(`Given: Prepare the promise that throws the exception`, () => {

            p = new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    try {
                        throw "xxxxx1";
                    } catch (ex) {
                        reject(ex);
                    }
                }, 500);
            });

        });

        it(`When: Throw asyce the exception.`, async () => {

            try {
                await p;
            } catch (ex) {
                act = ex;
            }


        });
        it(`Then: The result is "xxxxx1"`, () => {

            var exp = "xxxxx1";
            assert.equal(act, exp);

        });

    });

});