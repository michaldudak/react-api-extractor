function referenceTypes(a: CustomInterface, b: CustomType): CustomInterface | CustomType {
	return a;
}

function inlineTypes(a: { a: number }, b: { s: string }) {}

interface CustomInterface {
	a: number;
}

type CustomType = {
	s: string;
};
