/// <reference path="../../../typings/main.d.ts" />

import * as exp from "express";
import {HomeController} from "./home/homeController";

export const initRouter = (app: exp.Application) => {
    
    new HomeController(app);

};
