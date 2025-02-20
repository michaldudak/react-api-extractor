/**
 * A hook defined as an arrow function.
 *
 * @internal
 */
export const useHook = (parameters: HookParameters): HookReturnValue => {
	return {
		getProps(externalProps) {
			return externalProps;
		},
		ref(element: HTMLElement) {},
	};
};

interface HookParameters {
	value: string;
	severity: number;
	onChange: (value: string) => void;
}

interface HookReturnValue {
	getProps: (externalProps: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
	ref: React.RefCallback<HTMLElement>;
}
