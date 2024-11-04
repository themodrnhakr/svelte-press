export function startTheme(style) {
	let themeElement = document.createElement('style');
	themeElement.id = 'theme';
	themeElement.appendChild(document.createTextNode(style));
	document.head.appendChild(themeElement);
}
