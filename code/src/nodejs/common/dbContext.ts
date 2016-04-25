/// <reference path="../../../typings/main.d.ts" />

import * as mongoose from "mongoose";
import {Configuration} from "./configuration"


class DbContext {

    constructor(private connectionString: string) { }

    startToConnectAsync() {

        mongoose.connect(this.connectionString, {
            server: {
                poolSize: 5
            }
        });

        var p = new Promise<string>((resolve, reject) => {

            var db = mongoose.connection;
            db.once("open", () => {

                var msg = "success to connect db..";
                resolve(msg);

            });
            db.on("error", (err) => {

                var msg = err.message;
                reject(msg);

            });

        });
        return p;

    }

    closeToConnect() {
        mongoose.disconnect();
    }

}

export {DbContext}