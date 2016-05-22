/// <reference path="../../../../typings/index.d.ts" />

import "reflect-metadata";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {DbContext} from "../../../nodejs/core/common/dbContext";
var mockgoose = require("mockgoose");

import {AppHelper} from "../../../shareware/appHelper";
import {UserRepository, IUserEntity} from "../../../nodejs/core/repositories/userRepository";
import {BaseRepository} from "../../../nodejs/core/repositories/baseRepository";

let sandbox: Sinon.SinonSandbox;
let mydb: DbContext;

let prepareToRun = () => {
    before(async (done: MochaDone) => {

        mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
        sandbox = sinon.sandbox.create();
        done();

    });
    after(async (done: MochaDone) => {

        sandbox.restore();
        await mydb.closeAsync();
        done();

    });
};

describe(`Feature: Store the data to the collection of user`, () => {

    describe(`Scenario: create the user and store to database`, () => {

        prepareToRun();

        let userRep: UserRepository;

        it(`Given: I use the UserRepository.`, () => {

            userRep = new UserRepository();

        });
        it(`When: add user data.`, async () => {

            //add
            var newObj = userRep.createNewEntity();
            newObj.name = "Bibby";
            newObj.age = 18;
            newObj.sex = true;
            newObj.birthday = new Date();
            userRep.add(newObj);
            await userRep.saveChangeAsync();

        });
        it(`Then: the data is the same as user data.`, async () => {

            //retrive
            var getAllUsersAsync = () => {

                return userRep.getAll()
                    .find({})
                    .exec();

            }
            var all = await getAllUsersAsync();
            assert.equal(all.length, 1);

        });

    });

});