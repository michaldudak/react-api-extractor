import ts from 'typescript';
import { parseProperty } from './propertyParser';
import { ParserContext } from '../parser';
import { ObjectNode } from '../models';
import { getTypeNamespaces } from './typeResolver';

export function parseObjectType(
	type: ts.Type,
	name: string,
	context: ParserContext,
	skipResolvingComplexTypes: boolean,
): ObjectNode | undefined {
	const { shouldInclude, shouldResolveObject, typeStack, includeExternalTypes } = context;

	const properties = type
		.getProperties()
		.filter((property) => includeExternalTypes || !isPropertyExternal(property));

	const typeSymbol = type.aliasSymbol ?? type.getSymbol();
	let typeName = typeSymbol?.getName();
	if (typeName === '__type') {
		typeName = undefined;
	}

	if (properties.length) {
		if (
			!skipResolvingComplexTypes &&
			shouldResolveObject({ name, propertyCount: properties.length, depth: typeStack.length })
		) {
			const filtered = properties.filter((property) => {
				const declaration =
					property.valueDeclaration ??
					(property.declarations?.[0] as ts.PropertySignature | undefined);
				return (
					declaration &&
					ts.isPropertySignature(declaration) &&
					shouldInclude({ name: property.getName(), depth: typeStack.length + 1 })
				);
			});
			if (filtered.length > 0) {
				return new ObjectNode(
					typeName,
					getTypeNamespaces(type),
					filtered.map((property) => {
						return parseProperty(
							property,
							property.valueDeclaration as ts.PropertySignature,
							context,
						);
					}),
					undefined,
				);
			}
		}

		return new ObjectNode(typeName ?? undefined, getTypeNamespaces(type), [], undefined);
	}
}

function isPropertyExternal(property: ts.Symbol): boolean {
	return (
		property.declarations?.every((declaration) =>
			declaration.getSourceFile().fileName.includes('node_modules'),
		) ?? false
	);
}
