/// <reference path="../../../../typings/main.d.ts" />

import * as exp from "express";
import {BaseController} from "../../_requireNodejs";
import {Foo} from "../../../common/_requireCommon";

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

        res.render("./home/homeView", vm);

    }

}
