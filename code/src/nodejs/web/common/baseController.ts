/// <reference path="../../../../typings/index.d.ts" />

import * as exp from "express";

export abstract class BaseController {
    constructor(public app: exp.Application) { }
}
