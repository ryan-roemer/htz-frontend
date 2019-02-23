export default function setColor(prop, value, getColor) {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
}