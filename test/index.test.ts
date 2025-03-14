import path from 'node:path';
import fs from 'node:fs';
import { it, expect } from 'vitest';
import glob from 'fast-glob';
import * as rae from 'react-api-extractor';

const regenerateOutput = process.env.UPDATE_OUTPUT === 'true';

let testCases = glob.sync('**/input.{d.ts,ts,tsx}', { absolute: true, cwd: __dirname });
if (testCases.some((t) => t.includes('.only'))) {
	testCases = testCases.filter((t) => t.includes('.only'));
}

const program = rae.createProgram(
	testCases,
	rae.loadConfig(path.resolve(__dirname, 'tsconfig.json')).options,
);

for (const testCase of testCases) {
	const dirname = path.dirname(testCase);
	const testName = dirname.slice(__dirname.length + 1);
	const expectedOutput = path.join(dirname, 'output.json');

	it.skipIf(testCase.includes('.skip'))(testName, async () => {
		const moduleDefinition = rae.parseFromProgram(testCase, program);

		if (!regenerateOutput && fs.existsSync(expectedOutput)) {
			expect(moduleDefinition.toObject()).toMatchObject(
				JSON.parse(fs.readFileSync(expectedOutput, 'utf8')),
			);
		} else {
			fs.writeFileSync(
				expectedOutput,
				JSON.stringify(
					moduleDefinition.toObject(),
					(key, value) => {
						// These are TypeScript internals that change depending on the number of symbols created during test
						if (key === '$$id') {
							return undefined;
						}
						return value;
					},
					'\t',
				),
			);
		}
	});
}
