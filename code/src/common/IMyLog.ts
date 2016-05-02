//myLog
export interface IMyLog {

	log(level: myLogLevelEnum, obj: Object);

}
export enum myLogLevelEnum {

	info,
	warn,
	error

}