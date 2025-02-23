import _ from 'lodash';
import { Node } from '../nodes/baseNodes';
import { isLiteralNode } from './literal';
import { isSimpleTypeNode } from './simpleType';

const typeString = 'union';

export interface UnionNode extends Node {
	types: Node[];
}

export function unionNode(types: Node[]): UnionNode {
	const flatTypes: Node[] = [];

	flattenTypes(types);

	function flattenTypes(nodes: Node[]) {
		nodes.forEach((x) => {
			if (isUnionNode(x)) {
				flattenTypes(x.types);
			} else {
				flatTypes.push(x);
			}
		});
	}

	return uniqueUnionTypes({
		nodeType: typeString,
		types: flatTypes,
	});
}

export function isUnionNode(node: Node): node is UnionNode {
	return node.nodeType === typeString;
}

export function uniqueUnionTypes(node: UnionNode): UnionNode {
	return {
		nodeType: node.nodeType,
		types: _.uniqBy(node.types, (x) => {
			if (isLiteralNode(x)) {
				return x.value;
			}

			if (isSimpleTypeNode(x)) {
				return x.typeName;
			}

			return x.nodeType;
		}),
	};
}
