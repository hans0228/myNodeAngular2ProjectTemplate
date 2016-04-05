/// <reference path="../../typings/main.d.ts" />

import * as chai from "chai";
import {Foo} from "../core/foo";

var assert = chai.assert;

describe("foo", () => {

    it("getName", () => {

        var expected = "Bibby_Foo";
        var f = new Foo();

        assert.equal(f.getName(), expected);

    });


});