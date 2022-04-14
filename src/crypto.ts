function dec2hex(dec: number) {
  return ("0" + dec.toString(16)).substr(-2);
}

function sha256(plain: string) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: ArrayBuffer) {
  let str = "";
  const bytes = new Uint8Array(a);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }

  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

export function generateCodeChallengeFromVerifier(v: string) {
  return sha256(v).then(base64urlencode);
}
