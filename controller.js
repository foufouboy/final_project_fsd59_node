import path from "node:path";
import pug from "pug";
import storage from "./db.js";

const cwd = process.cwd();
const viewPath = path.join(cwd, "view");

export default {
	home: {
		get: (req, res) => {
			if (req.url.includes("?")) {
				const queryString = req.url.split("?")[1];
				const params = new URLSearchParams(queryString);
				const name = params.get("name");
				const birth = params.get("birth");
				console.log(name, birth);

				pug.renderFile(
					path.join(viewPath, "form.pug"),
					{ user: { name, birth } },
					(err, html) => {
						if (err) {
							res.writeHead(500, { "content-type": "text/html" });
							res.end("<h1>Internal Server Error</h1>");
							return;
						}

						res.writeHead(200, { "content-type": "text/html" });
						res.end(html);
					}
				);
				return;
			}
			pug.renderFile(path.join(viewPath, "form.pug"), (err, html) => {
				if (err) {
					res.writeHead(500, { "content-type": "text/html" });
					res.end("<h1>Internal Server Error</h1>");
					return;
				}

				res.writeHead(200, { "content-type": "text/html" });
				res.end(html);
			});
		},

		post: (req, res) => {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				const params = new URLSearchParams(body);
				const name = params.get("name");
				const birth = params.get("birth");

				const newUser = storage.addUser({ name, birth });

				res.writeHead(301, { Location: "/users" });
				res.end();
			});
		},
	},

	users: {
		get: (req, res) => {
			try {
				const users = storage.getUsers();
				pug.renderFile(
					path.join(viewPath, "users.pug"),
					{ users },
					(err, html) => {
						if (err) {
							res.statusCode = 500;
							res.setHeader("Content-Type", "text/html");
							res.end("<h1>Internal Server Error</h1>");
							return;
						}
						res.statusCode = 200;
						res.setHeader("Content-Type", "text/html");
						res.end(html);
					}
				);
			} catch (err) {
				console.error(err);
				res.statusCode = 500;
				res.setHeader("Content-Type", "text/html");
				res.end("<h1>Internal Server Error</h1>");
			}
		},

		put: (req, res) => {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				console.log(body);
				const params = new URLSearchParams(body);
				const originalName = params.get("originalName");
				const name = params.get("name");
				const birth = params.get("birth");

				storage.updateUser(originalName, { name, birth });

				res.writeHead(301, { Location: "/users" });
				res.end();
			});
		},

		delete: (req, res) => {
			let body = "";
			req.on("data", (chunk) => {
				body += chunk.toString();
			});
			req.on("end", () => {
				console.log("hey", body);
				const params = new URLSearchParams(body);
				const name = params.get("name");

				storage.deleteUser(name);

				res.writeHead(301, { Location: "/users" });
				res.end();
			});
		},
	},
};
