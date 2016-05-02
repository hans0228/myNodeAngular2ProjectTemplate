/// <reference path="../../../../typings/main.d.ts" />

import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {AppHelper} from "../../../common/appHelper";

import {UserRepository, IUser} from "../../../nodejs/core/repositories/userRepository";
import {DbContext} from "../../../nodejs/core/common/dbContext";
import {Configuration} from "../../../nodejs/core/common/configuration";

describe("repository => user", () => {


    var sandbox: Sinon.SinonSandbox;
    var mydb: DbContext;

    // beforeEach(async function (done: MochaDone) {
    //     this.timeout(6000);

    //     var connectionStr = "mongodb://xxx";
    //     mydb = new DbContext(connectionStr);
    //     await mydb.startToConnectAsync();

    //     sandbox = sinon.sandbox.create();

    //     done();
    // });

    // afterEach(async () => {

    //     sandbox.restore();

    //     await mydb.closeToConnectAsync();

    // });

    // it("create user", async () => {
    //     //this.timeout(6000);

    //     var userRep = new UserRepository();

    //     //add
    //     var newObj = userRep.createNewEntity();
    //     newObj.name = "Bibby";
    //     newObj.age = 18;
    //     newObj.sex = true;
    //     newObj.birthday = new Date();
    //     userRep.add(newObj);
    //     await userRep.saveChangeAsync();

    //     //retrive
    //     var getAllUsersAsync = () => {

    //         return userRep.getAll().find({})
    //             .exec((err, res) => {
    //                 return Promise.resolve<IUser[]>(res);
    //             });

    //     }
    //     var all = await getAllUsersAsync();
    //     assert.equal(all.length, 1);

    //     //delete
    //     for (var item of all) {
    //         userRep.remove(item);
    //     }
    //     await userRep.saveChangeAsync();

    //     all = await getAllUsersAsync();
    //     assert.equal(all.length, 0);


    // });




});