const db = require("../data/knexfile-config");

module.exports = {
	add,
	find,
	findBy,
	findById,
};

async function add(song) {
	console.log("Add song: ", song);
	try {
		const [id] = await db("songs").insert(song, "id");
		console.log("ID", id);
	} catch (error) {
		console.log(error);
	}

	return findById(id);
}

function find() {
	return db("songs").select(
		"id",
		"name",
		"artist",
		"album",
		"image_url",
		"popularity",
		"duration_ms",
		"key",
		"mode",
		"time_signature",
		"danceability",
		"energy",
		"instrumentalness",
		"liveness",
		"loudness",
		"speechiness",
		"valence",
		"tempo"
	);
}

function findBy(filter) {
	return db("songs").where(filter);
}

async function findById(id) {
	try {
		const songPromise = db("songs").where({ id }).first();
		const song = await songPromise.then(res => res).catch(err => err);
		console.log("findById song: ", song);
		return song;
	} catch (error) {
		console.log(error);
	}
}
