import { GraphQLError, GraphQLScalarType, } from 'graphql';
import { Kind, } from 'graphql/language/kinds';

// eslint-disable-next-line no-restricted-globals
const isDate = value => typeof value === 'number' && !isNaN(value.valueOf());

const coerceDate = value => {
  const date = new Date(value).getTime();
  if (!isDate(date)) {
    const message = `Date can't represent non-date value: ${value}`;
    throw new TypeError(message);
  }
  return date;
};

const GraphQLTimestamp = new GraphQLScalarType({
  name: 'Timestamp',
  serialize: value => coerceDate(value),
  parseValue: coerceDate,
  parseLiteral(valueNode) {
    const { kind, value, } = valueNode;
    let date;
    switch (kind) {
      case Kind.INT:
      case Kind.FLOAT:
        date = new Date(+value);
        break;
      case Kind.STRING:
        date = new Date(value);
        break;
      default:
    }
    if (!isDate(date)) {
      throw new GraphQLError(`Expected date value but got: ${value}`, [
        valueNode,
      ]);
    }
    return date;
  },
});

export default GraphQLTimestamp;
