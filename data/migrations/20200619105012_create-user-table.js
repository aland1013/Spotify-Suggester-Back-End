exports.up = function (knex) {
	return knex.schema
		.createTable("users", table => {
			table.increments("id");
			table.string("username", 128).notNullable();
			table.string("password", 128).notNullable();
			table.integer("recommended_request").unsigned();
		})

		.createTable("songs", table => {
			table.string("id", 128).notNullable().unique();
			table.string("name", 128).notNullable().unique();
			table.string("artist", 128).notNullable();
			table.string("album", 128).notNullable();
			table.string("image_url", 128).notNullable();
			table.integer("popularity").unsigned().notNullable();
			table.integer("duration_ms").unsigned().notNullable();
			table.integer("key").unsigned().notNullable();
			table.integer("mode").unsigned().notNullable();
			table.integer("time_signature").unsigned().notNullable();
			table.integer("danceability").unsigned().notNullable();
			table.integer("energy").unsigned().notNullable();
			table.integer("instrumentalness").unsigned().notNullable();
			table.integer("liveness").unsigned().notNullable();
			table.integer("loudness").unsigned().notNullable();
			table.integer("speechiness").unsigned().notNullable();
			table.integer("valence").unsigned().notNullable();
			table.integer("tempo").unsigned().notNullable();
		})

		.createTable("playlists", table => {
			table.increments("id");
			table.string("playlist_name", 128).notNullable();
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("users.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("playlist_songs", table => {
			table
				.integer("playlist_id")
				.unsigned()
				.notNullable()
				.references("playlists.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			table
				.string("song_id")
				.notNullable()
				.references("songs.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		})

		.createTable("favorite_songs", table => {
			table
				.integer("owner_id")
				.unsigned()
				.notNullable()
				.references("users.id")
				.onDelete('NO ACTION')
			table
				.string("song_id")
				.notNullable()
				.references("songs.id")
				.onDelete('NO ACTION')
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("favorite_songs")
		.dropTableIfExists("playlist_songs")
		.dropTableIfExists("playlists")
		.dropTableIfExists("songs")
		.dropTableIfExists("users");
};
