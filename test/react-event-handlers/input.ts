import * as React from 'react';

export function Test(props: Props): React.ReactNode {
	return null;
}

interface Props {
	onClick: React.MouseEventHandler;
	onKeyDown?: React.KeyboardEventHandler;
	onFocus: React.FocusEventHandler<HTMLDivElement>;
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
}
