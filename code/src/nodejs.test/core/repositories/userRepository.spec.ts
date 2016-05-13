/// <reference path="../../../../typings/main.d.ts" />

import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {DbContext} from "../../../nodejs/core/common/dbContext";
var mockgoose = require("mockgoose");

import {AppHelper} from "../../../shareware/appHelper";
import {UserRepository, IUserEntity} from "../../../nodejs/core/repositories/userRepository";
import {BaseRepository} from "../../../nodejs/core/repositories/baseRepository";

describe("repository => user", () => {

    var sandbox: Sinon.SinonSandbox;
    var mydb: DbContext;

    beforeEach(async () => {

        mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
        sandbox = sinon.sandbox.create();

    });

    afterEach(async () => {

        sandbox.restore();
        await mydb.closeAsync();

    });

    it("create user", async () => {

        var userRep = new UserRepository();

        //add
        var newObj = userRep.createNewEntity();
        newObj.name = "Bibby";
        newObj.age = 18;
        newObj.sex = true;
        newObj.birthday = new Date();
        userRep.add(newObj);
        await userRep.saveChangeAsync();

        //retrive
        var getAllUsersAsync = () => {

            return userRep.getAll()
                .find({})
                .exec();

        }
        var all = await getAllUsersAsync();
        assert.equal(all.length, 1);

        //delete
        for (var item of all) {
            userRep.remove(item);
        }
        await userRep.saveChangeAsync();

        all = await getAllUsersAsync();
        assert.equal(all.length, 0);

    });




});