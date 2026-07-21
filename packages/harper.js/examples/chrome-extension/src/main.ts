import { LocalLinter } from 'harper.js';
import { binary } from 'harper.js/binary';
import './style.css';

const form = document.querySelector<HTMLFormElement>('#lint-form')!;
const input = document.querySelector<HTMLTextAreaElement>('#text')!;
const button = document.querySelector<HTMLButtonElement>('button')!;
const status = document.querySelector<HTMLParagraphElement>('#status')!;
const results = document.querySelector<HTMLUListElement>('#results')!;

const linter = new LocalLinter({ binary });

async function lintText() {
	button.disabled = true;
	status.textContent = 'Checking…';
	results.replaceChildren();

	try {
		const lints = await linter.lint(input.value, { language: 'plaintext' });

		for (const lint of lints) {
			const item = document.createElement('li');
			item.textContent = lint.message();
			results.append(item);
		}

		status.textContent =
			lints.length === 0 ? 'No issues found.' : `${lints.length} issue(s) found.`;
	} catch (error) {
		console.error(error);
		status.textContent = 'Harper could not lint this text. See the extension console for details.';
	} finally {
		button.disabled = false;
	}
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	void lintText();
});

async function main() {
	try {
		await linter.setup();
		button.disabled = false;
		await lintText();
	} catch (error) {
		console.error(error);
		status.textContent = 'Harper could not start. See the extension console for details.';
	}
}

void main();

window.addEventListener('pagehide', () => {
	void linter.dispose();
});
