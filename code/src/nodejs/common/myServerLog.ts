
var winston = require("winston");
require('winston-loggly');

import {IMyLog, myLogLevelEnum} from "../../common/IMyLog";

//https://www.loggly.com/
export class myServerLog implements IMyLog {

	private static _instance: IMyLog = new myServerLog();

	static getInstance() {
		return myServerLog._instance;
	}

	constructor() {

		if (myServerLog._instance) {
			throw new Error("Error: Instantiation failed => Use SingletonDemo.getInstance() instead of new.");
		}
		myServerLog._instance = this;

		winston.add(winston.transports.Loggly, {
			token: "xxxx",
			subdomain: "xxxx",
			tags: ["Winston-NodeJS"],
			json: true
		});

	}

	log(level: myLogLevelEnum, obj: Object) {

		winston.log(myLogLevelEnum[level], JSON.stringify(obj));

	}

}


