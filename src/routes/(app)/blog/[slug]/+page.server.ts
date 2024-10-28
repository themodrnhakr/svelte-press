import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { page } from '$app/stores';
import { db } from '$lib/server/db/db';
import { posts } from '$lib/server/db/schema/posts';
import { eq } from 'drizzle-orm';
import { postsDataSingle } from '$lib/server/getPosts';

export const load: PageServerLoad = async ({ params }) => {
	// const postData = await db.select().from(posts).where(eq(posts.slug, params.slug)).limit(1);
	const postData = await postsDataSingle(params.slug);
	if (postData.length === 0) {
		error(404, {
			message: 'Article not found'
		});
	}
	if (postData.length > 1) {
		error(500, {
			message: 'Server error'
		});
	}
	return {
		post: postData
	};
};
