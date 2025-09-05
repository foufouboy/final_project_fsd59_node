import fsSync from "node:fs";
import path from "node:path";
import { jsonToObject } from "./utils.js";

const cwd = process.cwd();

class Storage {
	getUsers() {
		const data = fsSync.readFileSync(
			path.join(cwd, "data", "storage.json"),
			"utf-8"
		);
		return jsonToObject(data);
	}

	addUser(user) {
		const users = this.getUsers();
		users.push(user);
		fsSync.writeFileSync(
			path.join(cwd, "data", "storage.json"),
			JSON.stringify(users, null, 2),
			"utf-8"
		);
	}

	deleteUser(name) {
		let users = this.getUsers();
		users = users.filter(
			(user) => user.name.toLowerCase() !== name.toLowerCase()
		);
		fsSync.writeFileSync(
			path.join(cwd, "data", "storage.json"),
			JSON.stringify(users, null, 2),
			"utf-8"
		);
	}

	updateUser(name, newData) {
		const users = this.getUsers();
		const userIndex = users.findIndex(
			(user) => user.name.toLowerCase() === name.toLowerCase()
		);
		if (userIndex !== -1) {
			users[userIndex] = { ...users[userIndex], ...newData };
			fsSync.writeFileSync(
				path.join(cwd, "data", "storage.json"),
				JSON.stringify(users, null, 2),
				"utf-8"
			);
		}
	}
}

export default new Storage();
