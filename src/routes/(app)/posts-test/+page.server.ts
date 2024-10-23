import { posts } from '/src/lib/db/schema/posts';
import { db } from '$lib/db/db';
import type { PageServerLoad } from './$types';
import { postsData } from '$lib/server/getPosts';

const result = await db.select().from(posts);

console.log(result);
console.log(postsData);

export const load: PageServerLoad = ({ params }) => {
	return {
		posts: postsData
	};
};
