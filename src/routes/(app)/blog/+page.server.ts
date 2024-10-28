import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/db';
import { posts } from '$lib/server/db/schema/posts';

const postsData = await db
	.select({
		title: posts.title,
		slug: posts.slug
	})
	.from(posts);

console.log(postsData);

export const load: PageServerLoad = async () => {
	return {
		data: await postsData
	};
};
