/// <reference path="../../../typings/main.d.ts" />

import * as exp from "express";
//import {HomeController} from "../_requireNodejs";
import {HomeController} from "../../nodejs/web/home/homeController";

//import {HomeController} from "./home/homeController";

export const InitRouter = (app: exp.Application) => {

    new HomeController(app);

};
