export const jsonToObject = (jsonString) => {
	try {
		const obj = JSON.parse(jsonString);
		return obj;
	} catch (error) {
		console.error("Invalid JSON string:", error);
		return null;
	}
};
