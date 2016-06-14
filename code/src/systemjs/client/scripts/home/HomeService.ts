import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

import {AppHelper} from "./../../../../shareware/appHelper";

@Injectable()
export class HomeService {

    constructor(private http: Http) { }

    private asyncWording = "Bibby";

    getNameAsync() {

        var p = new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.asyncWording);
            }, 500);
        });
        return p;

    }

    getServerDataAsync() {

        var url = "/abc/cde";
        return this.http.get(url)
            .map<string>(r => {
                if (r.status != 200)
                    throw Error("xxxxxx");
                return r.json();
            })
            .toPromise();

    }

}