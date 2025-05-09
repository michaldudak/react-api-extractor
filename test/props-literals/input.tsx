import * as React from 'react';

export function Component(props: Props): React.ReactElement {
	return <div {...props} />;
}

interface Props {
	stringLiteral: 'foo';
	numberLiteral: 42;
	booleanLiteral: true;
	nullLiteral: null;
}
