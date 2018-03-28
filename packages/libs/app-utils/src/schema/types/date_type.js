import { GraphQLScalarType, } from 'graphql';
import { GraphQLError, } from 'graphql/error';
import { Kind, } from 'graphql/language';

const toString = Object.prototype.toString;
const isDate = value =>
  // eslint-disable-next-line no-restricted-globals
  toString.call(value) === '[object Date]' && !isNaN(value.valueOf());

const coerceDate = value => {
  const date = new Date(value);
  if (!isDate(date)) {
    const message = `Date can't represent non-date value: ${value}`;
    throw new TypeError(message);
  }
  return date;
};

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize: value => coerceDate(value).toISOString(),
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

export default GraphQLDate;
