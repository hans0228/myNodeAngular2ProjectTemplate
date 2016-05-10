
var winston = require("winston");
require('winston-loggly');

import {IMyLog, myLogLevelEnum} from "../../../common/IMyLog"


//https://www.loggly.com/
export class MyServerLog implements IMyLog {

	private static _instance: IMyLog = new MyServerLog();

	static getInstance() {
		return MyServerLog._instance;
	}

	constructor() {

		if (MyServerLog._instance) {
			throw new Error("Error: Instantiation failed => Use SingletonDemo.getInstance() instead of new.");
		}
		MyServerLog._instance = this;

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


