/// <reference path="../../../typings/main.d.ts" />

import * as exp from "express";
import {BaseController} from "../common/baseController";
import {Foo} from "../../core/foo";
import {AppHelper} from "../../core/AppHelper";

export class HomeController extends BaseController {

    constructor(public app: exp.Application) {
        super(app);

        this.app.get("/", (req, res) => this.indexAsync(req, res));
    }

    private async indexAsync(req: exp.Request, res: exp.Response) {

        var f = new Foo();
        var aynceWording = await f.getNameAsync();

        var vm = {
            title: "myApp Title",
            content: "data from server content",
            asyncContent: aynceWording
        };

        AppHelper.consoleWrite("home page log", vm);

        res.render("./home/homeView", vm);

    }

}
