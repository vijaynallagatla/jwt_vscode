interface Header {
  Algorithm: string;
  Type: string;
}

interface DecodedToken {
  Header: Headers;
  Payload: any;
  VerifySignature: any;
}
