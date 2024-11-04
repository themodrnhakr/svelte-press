//
// let wanderlust = {
// 	colors: {
// 		light: {
// 			background: '',
// 			text: '',
// 			title: '',
// 			subtitle: '',
// 			author: '',
//
// 			button: '',
// 			button-alternate: '',
// 		}
// 	}
// }

// let theme = $state({
// 	light: {
// 		background: 'pink'
// 	},
// 	dark: {
// 		background: 'purple'
// 	}
// });
// export let themeCSS = $derived(`
// 				:root {
// 					--bg-color: ${theme.light.background}
// 				}
//
// 				[data-theme="dark"] {
// 					--bg-color: ${theme.dark.background}
// 				}
// 				`);
export default function craftTheme(theme) {
	let css = ':root{';
	for (const [key, value] of Object.entries(theme.colors.light)) {
		const prop = `--${key}-color:${value}`;
		css = css + prop + ';';
	}
	css = css + '}';

	css = css + '[data-theme="dark"]{';
	for (const [key, value] of Object.entries(theme.colors.dark)) {
		const prop = `--${key}-color:${value}`;
		css = css + prop + ';';
	}
	css = css + '}';

	return css;
}
