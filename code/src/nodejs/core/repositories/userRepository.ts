import * as mongoose from "mongoose";
//import {BaseRepository} from "./baseRepository";
import {BaseRepository} from "../../_requireNodejs";

class UserRepository extends BaseRepository<IUser> {

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

interface IUser extends mongoose.Document {
	name: string;
	age: number;
	sex: boolean;
	birthday: Date;
}

export {IUser, UserRepository}
