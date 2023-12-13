import assert from "node:assert";
import fetch from "./axios.js";

describe("GET /", function() {
	it("responds with a 308 status", async () => {
		const response = await fetch(`/`);
		assert.equal(response.status, 308);
		assert.equal(response.headers.get("location"), "/top/1");
	});
});

describe("GET /top", function() {
	it("responds with a 200 status", async () => {
		const response = await fetch(`/top`);
		assert.equal(response.status, 308);
		assert.equal(response.headers.get("location"), "/top/1");
	});
});

describe("GET /top/", function() {
	it("responds with a 200 status", async () => {
		const response = await fetch(`/top/`);
		assert.equal(response.status, 308);
		assert.equal(response.headers.get("location"), "/top/1");
	});
});

describe("GET /top/1", function() {
	it("responds with a 200 status", async () => {
		const response = await fetch(`/top/1`);
		assert.equal(response.status, 200);
		assert.equal(response.headers.get("content-type"), "text/html;charset=UTF-8");
	});
});

describe("GET /top/100", function() {
	it("responds with a 404 status", async () => {
		const response = await fetch(`/top/100`);
		assert.equal(response.status, 404);
		assert.equal(response.headers.get("content-type"), "text/plain; charset=UTF-8");
	});
});
