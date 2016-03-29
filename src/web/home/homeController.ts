/// <reference path="../../../typings/main.d.ts" />

import * as exp from "express";
import {BaseController} from "../common/baseController";

export class HomeController extends BaseController {

    constructor(public app: exp.Application) {
        super(app);

        this.init();
    }

    init(): void {

        this.app.get("/", (req: exp.Request, res: exp.Response) => {

            var vm = {
                title: "myApp Title",
                content: "data from server content"
            };

            res.render("./home/homeView", vm);

        });

    }

}
