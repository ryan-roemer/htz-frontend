const b64EncodeUnicode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
  (match, p1) => String.fromCharCode(`0x${p1}`)));

const b64DecodeUnicode = str => decodeURIComponent(atob(str).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

export { b64EncodeUnicode, b64DecodeUnicode, };
