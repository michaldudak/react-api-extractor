import * as React from 'react';

export function Component(props: Props): React.ReactElement {
	return <div {...props} />;
}

interface Props {
	s: string;
	nb: number;
	b: boolean;
	n: null;
}
