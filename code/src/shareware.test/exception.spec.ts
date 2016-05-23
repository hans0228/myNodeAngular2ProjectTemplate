/// <reference path="../../typings/index.d.ts" />
import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "./../shareware/appHelper";

let sandbox: Sinon.SinonSandbox;
var prepareToRun = (_self, tag: string) => {
    _self.Before({ tags: [tag] }, (scenario: any) => {
        sandbox = sinon.sandbox.create();
    });
    _self.After({ tags: [tag] }, (scenario) => {
        sandbox.restore();
    });
};

export = function () {

    prepareToRun(this, "@trytocatchtheexceptions");

    let act: string;
    this.When(/^Throw exception "([^"]*)"\.$/, function (exception1) {

        try {
            throw exception1;
        } catch (ex) {
            act = ex;
        }

    });

    this.Then(/^The result is "([^"]*)"\.$/, function (exp) {

        assert.equal(act, exp);

    });

    let p;
    this.Given(/^Prepare the promise "([^"]*)" to throws the exception\.$/, function (exception1) {

        p = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    throw exception1;
                } catch (ex) {
                    reject(ex);
                }
            }, 500);
        });

    });
    this.When(/^Throw asyce the exception\.$/, async function () {

        try {
            await p;

        } catch (ex) {
            act = ex;
        }

    });

};