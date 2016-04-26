import * as mongoose from "mongoose";
import {BaseRepository} from "./baseRepository";


export class UserRepository extends BaseRepository<IUser> {

	getDocumentName() {
		return "User";
	}

	getSchema() {

		var userSchema = {
			Name: { type: String },
			Age: { type: Number },
			Sex: { type: Boolean },
			Birthday: { type: Date }
		};
		var s = new mongoose.Schema(userSchema);
		return s;

	}

}

export interface IUser extends mongoose.Document {
	Name: string;
	Age: number;
	Sex: boolean;
	Birthday: Date;
}

