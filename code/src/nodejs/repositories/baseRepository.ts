import * as mongoose from "mongoose";

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
		var schema = this.getSchema();
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

	saveChange() {

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

		promiseArr.forEach(p => {

			p.then(() => {
				console.log("db save...");
			})

		});

	}
}
