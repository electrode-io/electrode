declare class Partial {
    _name: any;
    constructor(name: any, data: any);
    set config(config: any);
    get config(): any;
    set options(options: any);
    get options(): any;
    merge(data: any, concatArray: any): void;
    setOverride(fn: any): void;
    compose(options: any): any;
}
export = Partial;
