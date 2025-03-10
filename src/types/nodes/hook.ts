import { Documentation } from '../documentation';
import { CallSignature, FunctionNode } from './function';
import { Node } from './node';

const typeString = 'hook';

export interface HookNode extends Omit<FunctionNode, 'nodeType'> {
	nodeType: typeof typeString;
}

export function hookNode(
	name: string,
	callSignatures: CallSignature[],
	documentation: Documentation | undefined,
): HookNode {
	return {
		nodeType: typeString,
		name: name,
		callSignatures,
		documentation,
	};
}

export function isHookNode(node: Node): node is HookNode {
	return node.nodeType === typeString;
}
