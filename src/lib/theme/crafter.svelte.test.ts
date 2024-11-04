import craftTheme from './crafter.svelte';
import { expect, test } from 'vitest';

const testTheme = {
	colors: {
		light: {
			primary: 'hsla(139,19%,30%,100%)',
			secondary: 'hsla(39,43%,40%,100%)',
			background: 'hsla(38,18%,12%,100%)'
		},
		dark: {
			primary: 'hsla(139,19%,70%,100%)',
			secondary: 'hsla(39,43%,60%,100%)',
			background: 'hsla(38,18%,92%,100%)'
		}
	}
};
const testResult = `:root{--primary-color:hsla(139,19%,30%,100%);--secondary-color:hsla(39,43%,40%,100%);--background-color:hsla(38,18%,12%,100%);}[data-theme="dark"]{--primary-color:hsla(139,19%,70%,100%);--secondary-color:hsla(39,43%,60%,100%);--background-color:hsla(38,18%,92%,100%);}`;

const tested = 'test';
test('test', () => {
	expect(tested).toBe('test');
});
test('Testing dummy theme', () => {
	expect(craftTheme(testTheme)).toBe(testResult);
});
