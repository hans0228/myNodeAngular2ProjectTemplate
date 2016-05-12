/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from "mongoose";
var mockgoose = require("mockgoose");

export class DbContext {

    private _isInMemory = false;
    set isInMemory(value: boolean) {
        this._isInMemory = value;
    }
    constructor(private connectionString: string) { }

    connectAsync() {

        if (this._isInMemory)
            return this.connectInMemory();
        return this.connect();

    }

    closeAsync() {

        if (this._isInMemory)
            return this.closeInMemory();
        return this.close();

    }

    private connect() {

        var p = new Promise<string>((resolve, reject) => {
            this.connectMongoose(resolve, reject);
        });
        return p;

    }

    private close() {

        return mongoose.disconnect((err) => {
            return Promise.resolve("stop the connection.");
        });

    }

    private connectInMemory() {

        var p = new Promise<string>((resolve, reject) => {
            mockgoose(mongoose).then(() => {
                this.connectMongoose(resolve, reject);
            });
        });
        return p;

    }

    private closeInMemory() {

        return mockgoose.reset(() => {
            return mongoose.disconnect((err) => {
                return Promise.resolve("stop the connection.");
            });
        });

    }

    private connectMongoose(resolve: () => void, reject: (error: any) => void) {

        mongoose.connect(this.connectionString, {
            server: {
                poolSize: 5
            }
        }, (err) => {

            if (err) {
                reject(err);
                return;
            }
            //console.log("success to connect the db..")
            resolve();

        });

    }

}
