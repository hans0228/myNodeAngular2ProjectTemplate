
import {MyLogLevelEnum} from "./MyLogLevelEnum.ts";

export interface IMyLog {

	log(level: MyLogLevelEnum, obj: Object);

}