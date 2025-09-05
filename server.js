import http from "node:http";
import module from "./controller.js";
import fs from "node:fs";
import controller from "./controller.js";

const hostname = "localhost";
const port = "8080";

const server = http.createServer((req, res) => {
	const url = req.url.replace("/", "");

	// ASSETS

	if (url === "assets/css/style.css") {
		const css = fs.readFileSync("./assets/css/style.css", "utf-8");
		res.writeHead(200, { "Content-Type": "text/css" });
		res.end(css);
	} else if (url === "" && req.method === "GET") {
		controller.home.get(req, res);
		return;
	} else if (url === "" && req.method === "POST") {
		controller.home.post(req, res);
		return;
	} else if (url === "users") {
		controller.users.get(req, res);
		return;
	} else if (url === "delete" && req.method === "POST") {
		controller.users.delete(req, res);
		return;
	} else if (url.match(/edit\?.+/) && req.method === "GET") {
		console.log(req.method);
		controller.home.get(req, res);
	} else if (url === "edit" && req.method === "POST") {
		controller.users.put(req, res);
		return;
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("404 Not Found");
		return;
	}
});

server.listen(port, hostname, () => {
	console.log(`Server listening at http://${hostname}:${port}`);
});
