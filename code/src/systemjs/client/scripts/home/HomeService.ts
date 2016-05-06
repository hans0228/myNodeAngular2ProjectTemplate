import {Injectable} from '@angular/core';

@Injectable()
export class HomeService {

    private asyncWording = "Bibby";

    getNameAsync() {

        var p = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.asyncWording);
            }, 500);
        });
        return p;

    }

}