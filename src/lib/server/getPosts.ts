import { posts } from '/src/lib/server/db/schema/posts';
import { db } from '/src/lib/server/db/db';
import { marked } from 'marked';
import { eq } from 'drizzle-orm';

const renderer = {
	heading({ tokens, depth }) {
		const text = this.parser.parseInline(tokens);
		const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

		return `<h${depth} id="${escapedText}" class="heading">${text}</h${depth}>`;
	},
	paragraph({ tokens }) {
		const text = this.parser.parseInline(tokens);

		return `<p class="text">${text}</p>`;
	}
};

function outputConstructor(array) {
	let output = [];
	marked.use({ renderer });
	for (let item of array) {
		let obj = {};
		obj.id = item.id;
		obj.title = item.title;
		obj.subtitle = item.subtitle;
		obj.body = marked.parse(item.body);
		output.push(obj);
	}
	return output;
}

const result = await db.select().from(posts);
async function resultOne(slug) {
	const result = await db.select().from(posts).where(eq(posts.slug, slug));
	return result;
}

export const postsData = outputConstructor(result);
export async function postsDataSingle(slug) {
	const data = await resultOne(slug);
	return outputConstructor(data);
}
