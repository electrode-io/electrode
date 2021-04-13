declare class Profile {
    _name: any;
    constructor(name: any, partials: any);
    get name(): any;
    get partials(): any;
    setPartial(name: any, options: any): void;
    getPartial(name: any): any;
    delPartial(name: any): void;
}
export = Profile;
