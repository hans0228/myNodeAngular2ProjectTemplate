/// <reference path="../../../../typings/main.d.ts" />

import * as exp from "express";

export abstract class BaseController {
    constructor(public app: exp.Application) { }
}
