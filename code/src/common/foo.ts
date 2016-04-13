

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

}