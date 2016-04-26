/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from "mongoose";
import {Configuration} from "./configuration"


class DbContext {

    constructor(private connectionString: string) { }

    startToConnectAsync() {

        var p = new Promise<string>((resolve, reject) => {

            mongoose.connect(this.connectionString, {
                server: {
                    poolSize: 5
                }
            }, (err) => {

                if (err) {
                    reject(err);
                    return;
                }
                console.log("success to connect the db..")
                resolve();

            });
        });
        return p;

    }

    closeToConnectAsync() {

        return mongoose.disconnect((err) => {
            return Promise.resolve("stop the connection.");
        });

    }

}

export {DbContext}