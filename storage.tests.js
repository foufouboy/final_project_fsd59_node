import storage from "./db.js";

const testGetUsers = () => {
	const users = storage.getUsers();
	console.assert(Array.isArray(users), "getUsers should return an array");
	console.assert(
		users.length > 0,
		"getUsers should return at least one user"
	);
	console.log(users);
	console.log("All tests passed!");
};

const testAddUser = () => {
	const newUser = { name: "Jane Doe", birth: "2019-14-08" };
	storage.addUser(newUser);
	const users = storage.getUsers();
	const addedUser = users.find(
		(user) => user.name === newUser.name && user.age === newUser.age
	);
	console.assert(addedUser, "addUser should add a new user");
	console.log("All tests passed!");
};

const testDeleteUser = () => {
	const userNameToDelete = "Jane Doe";
	storage.deleteUser(userNameToDelete);
	const users = storage.getUsers();
	const deletedUser = users.find((user) => user.name === userNameToDelete);
	console.assert(!deletedUser, "deleteUser should remove the user");
	console.log("All tests passed!");
};

const main = () => {
	testAddUser();
	testGetUsers();
	testDeleteUser();
	testGetUsers();
};

main();
