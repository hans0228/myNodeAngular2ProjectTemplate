/// <reference path="../../typings/index.d.ts" />
import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "./../shareware/appHelper";

export = function () {

    var step = <cucumber.StepDefinitions>this;
    var hook = <cucumber.Hooks>this;

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