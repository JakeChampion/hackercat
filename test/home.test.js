/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./axios.js";

describe("GET /", function() {
	it("responds with a 308 status", async () => {
		const response = await axios.get(`/`);
		assert.equal(response.status, 308);
		assert.equal(response.headers["location"], "/top/1");
	});
});

describe("GET /top", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/top`);
		assert.equal(response.status, 308);
		assert.equal(response.headers["location"], "/top/1");
	});
});

describe("GET /top/", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/top/`);
		assert.equal(response.status, 308);
		assert.equal(response.headers["location"], "/top/1");
	});
});

describe("GET /top/1", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/top/1`);
		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/html;charset=UTF-8");
	});
});

describe("GET /top/100", function() {
	it("responds with a 404 status", async () => {
		const response = await axios.get(`/top/100`);
		assert.equal(response.status, 404);
		assert.equal(response.headers["content-type"], "text/plain;charset=UTF-8");
	});
});