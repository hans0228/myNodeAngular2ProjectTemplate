/// <reference path="../../../../typings/index.d.ts" />

import "reflect-metadata";
import * as _ from "underscore";
import {assert} from "chai";
import * as sinon from "sinon";
import * as proxyquire from "proxyquire";
import {DbContext} from "../../../nodejs/core/common/dbContext";
var mockgoose = require("mockgoose");


import {AppHelper} from "../../../shareware/appHelper";
import {UserRepository, IUserEntity} from "../../../nodejs/core/repositories/userRepository";
import {BaseRepository} from "../../../nodejs/core/repositories/baseRepository";

let mydb: DbContext;
let sandbox: Sinon.SinonSandbox;
var prepareToRun = (_self, tag: string) => {
    _self.Before({ tags: [tag] }, async (scenario: any) => {
		mydb = new DbContext("xxx");
        mydb.isInMemory = true;
        await mydb.connectAsync();
		sandbox = sinon.sandbox.create();
    });
    _self.After({ tags: [tag] }, async (scenario) => {
		await mydb.closeAsync();
		sandbox.restore();
    });
};

export = function () {

	prepareToRun(this, "@ce480339-62e5-4681-9cf4-8d4ec91ae14e");

	let userRep: UserRepository;
	let fakeUser;

	this.Given(/^Prepare the user data\.$/, function (arr) {

		fakeUser = arr.hashes()[0]
		userRep = new UserRepository();

	});

	this.When(/^Add user data to database\.$/, async function () {

		//add
		var newObj = userRep.createNewEntity();
		newObj = _.extend(newObj, fakeUser);
		userRep.add(newObj);
		await userRep.saveChangeAsync();

	});

	this.Then(/^There is a user in database\.$/, async function () {

		//retrive
		var getAllUsersAsync = () => {

			return userRep.getAll()
				.find({})
				.exec();

		}
		
		var all = await getAllUsersAsync();
		assert.equal(all.length, 1);

		var uu = all[0];
		assert.equal(uu.name, fakeUser.name);
		assert.equal(uu.age, fakeUser.age);
		assert.deepEqual(uu.birthday, new Date(fakeUser.birthday));

	});


};