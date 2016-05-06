import {Bar} from "./_requireCommon";

export class Foo {

    private wording = "Bibby_Foo";

    getName() {

        return this.wording;

    }

    getNameAsync() {

        var p = new Promise<string>((resolve, reject) => {

            resolve(this.wording);

        });
        return p;

    }

    getInt() {

        var b = new Bar();
        return b.getNumber();

    }

}