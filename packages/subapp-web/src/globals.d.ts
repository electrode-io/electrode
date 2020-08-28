export {}
declare global {
  namespace NodeJS {
    interface Global {
        _wml: {
            jwt: any
        },
        xarcV1: any;
    }
  }

  interface Window {
    _wml: any;
    xarcV1: any;
  }
}
