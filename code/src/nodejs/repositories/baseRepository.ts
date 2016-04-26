import * as mongoose from "mongoose";
import {AppHelper} from "../../common/appHelper";

export abstract class BaseRepository<T extends mongoose.Document> {

	private addArr: mongoose.Document[] = [];
	private removeArr: mongoose.Document[] = [];
	private updateArr: mongoose.Document[] = [];

	abstract getDocumentName(): string;

	abstract getSchema(): mongoose.Schema;

	createNewEntity(): T {
		return new (this.getAll())(null);
	}

	getAll() {

		var documentName = this.getDocumentName();
		var schema = this.getSchema()	;
		try {
			return mongoose.model<T>(documentName, schema);
		} catch (ex) {
			return mongoose.model<T>(documentName, null);
		}

	}

	add(entity: T) {
		this.addArr.push(entity);
	}

	remove(entity: T) {
		this.removeArr.push(entity);
	}

	update(entity: T) {
		this.updateArr.push(entity);
	}

	saveChangeAsync() {

		var promiseArr: Promise<void>[] = [];

		this.addArr.forEach(a => {

			var p = new Promise<void>((resolve, reject) => {

				a.save((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});

			});

			promiseArr.push(p);

		});

		this.removeArr.forEach(a => {

			var p = new Promise<void>((resolve, reject) => {

				a.remove((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});

			});

			promiseArr.push(p);

		});

		this.updateArr.forEach(a => {

			var p = new Promise<void>((resolve, reject) => {

				a.save((err) => {
					if (err) {
						reject(err);
						return;
					}
					resolve();
				});

			});

			promiseArr.push(p);

		});

		var p = new Promise(async (resolve, reject) => {

			try {

				for (var item of promiseArr) {
					await item;
				}
				resolve();

			} catch (err) {

				reject(err);

			}

		});
		return p;

	}
}
