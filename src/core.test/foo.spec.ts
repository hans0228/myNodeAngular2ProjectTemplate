/// <reference path="../../typings/main.d.ts" />

import {assert} from "chai";
import {Foo} from "../core/foo";

describe("server side test => foo", () => {

    it("getName", () => {

        var expected = "Bibby_Foo";
        var f = new Foo();

        assert.equal(f.getName(), expected);

    });

    it("getNameAsync", async () => {

        var expected = "Bibby_Foo";
        var f = new Foo();

        var actual = await f.getNameAsync();

        assert.equal(actual, expected);

    });


});