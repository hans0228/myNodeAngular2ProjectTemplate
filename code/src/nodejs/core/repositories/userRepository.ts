import * as mongoose from "mongoose";
import {BaseRepository} from "../../../nodejs/core/repositories/baseRepository";

export interface IUserEntity extends mongoose.Document {
	name: string;
	age: number;
	sex: boolean;
	birthday: Date;
}

export class UserRepository extends BaseRepository<IUserEntity> {

	getDocumentName() {
		return "User";
	}

	getSchema() {

		var userSchema = {
			name: { type: String },
			age: { type: Number },
			sex: { type: Boolean },
			birthday: { type: Date }
		};
		var s = new mongoose.Schema(userSchema);
		return s;

	}

}