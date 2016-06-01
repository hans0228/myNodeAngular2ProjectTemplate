/// <reference path="../../../../typings/index.d.ts" />

import * as exp from "express";
import {BaseController} from "../../../nodejs/web/common/baseController";
import {Foo} from "../../../shareware/foo";
import {AppHelper} from "./../../../shareware/appHelper"

export class HomeController extends BaseController {

    constructor(public app: exp.Application) {
        super(app);

        this.app.get("/", (req, res) => this.indexAsync(req, res));
        this.app.get("/spa", (req, res) => this.spa(req, res));
        this.app.get("/api", (req, res) => this.apiAsync(req, res));
    }

    private spa(req: exp.Request, res: exp.Response) {

        var url = "/scripts/systemjs/client/scripts/spa/layout.html";
        res.redirect(url);

    }

    private async indexAsync(req: exp.Request, res: exp.Response) {

        var f = new Foo();
        var aynceWording = await f.getNameAsync();

        var vm = {
            title: "myApp Title",
            content: "data from server content",
            asyncContent: aynceWording
        };

        res.render("./home/homeView", vm);

    }

    private async apiAsync(req: exp.Request, res: exp.Response) {

        var f = new Foo();
        var aynceWording = await f.getNameAsync();

        var vm = {
            title: "myApp Title",
            asyncContent: aynceWording
        };

        res.status(200).json(vm);

    }

}
