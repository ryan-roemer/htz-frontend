import GraphQLJSON from 'graphql-type-json';
import { GraphQLScalarType, } from 'graphql';
import { Kind, } from 'graphql/language';
import { GraphQLError, } from 'graphql/error';

const toString = Object.prototype.toString;
// eslint-disable-next-line no-restricted-globals
const isDate = value => toString.call(value) === '[object Date]' && !isNaN(value.valueOf());

const coerceDate = value => {
  const date = new Date(value);
  if (!isDate(date)) {
    const message = `Date can't represent non-date value: ${value}`;
    throw new TypeError(message);
  }
  return date;
};


export default {
  JSON: GraphQLJSON,
  ImageAspects: new GraphQLScalarType({
    name: 'ImageAspects',
    serialize: value => value,
    parseValue: value => value,
    parseLiteral(valueNode) {
      // eslint-disable-next-line no-unused-vars
      const { kind, value, } = valueNode;
      return value;
    },
  }),
  Date: new GraphQLScalarType({
    name: 'Date',
    serialize: value => coerceDate(value)
      .toISOString(),
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
  }),
};
