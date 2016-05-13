
var winston = require("winston");
require('winston-loggly');

import {IMyLog} from "../../../shareware/IMyLog";
import {MyLogLevelEnum} from "./../../../shareware/MyLogLevelEnum";


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

	log(level: MyLogLevelEnum, obj: Object) {

		winston.log(MyLogLevelEnum[level], JSON.stringify(obj));

	}

}


