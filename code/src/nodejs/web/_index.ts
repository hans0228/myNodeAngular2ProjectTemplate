/// <reference path="../../../typings/main.d.ts" />

import * as exp from "express";
import {HomeController} from "./home/homeController";

export const init = (app: exp.Application) => {
    
    new HomeController(app);


};