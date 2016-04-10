import {Injectable} from 'angular2/core';

@Injectable()
export class AppHelper {

    static consoleWrite(title: string, obj: any) {

        console.log(`===========${title}===========`);
        console.log(obj);
        console.log(`======================`);

    }

}