import { posts } from '/src/lib/db/schema/posts';
import { db } from '/src/lib/db/db';
import { marked } from 'marked';

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

export const postsData = outputConstructor(result);
