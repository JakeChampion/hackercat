/* eslint-env mocha */

"use strict";

import assert from "proclaim";
import axios from "./axios.js";

describe("GET /item/30947153", function() {
	it("responds with a 200 status", async () => {
		const response = await axios.get(`/item/30947153`);
		assert.equal(response.status, 200);
		assert.equal(response.headers["content-type"], "text/html;charset=UTF-8");
	});
});

describe("GET /item/99999999999", function() {
	it("responds with a 404 status", async () => {
		const response = await axios.get(`/item/99999999999`);
		assert.equal(response.status, 404);
		assert.equal(response.headers["content-type"], "text/plain;charset=UTF-8");
	});
});