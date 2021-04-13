declare class WebpackConfigComposer {
    logger: any;
    constructor(options: Record<string, unknown> | undefined | null);
    get profiles(): any;
    get partials(): any;
    addProfiles(profiles: any): any;
    addProfile(name: string, partials: Record<string, unknown> | unknown): any;
    addPartialToProfile(partialName: any, profileName: any, config: any, partialOptions: any): void;
    addPartials(partials: any): void;
    _addPartial(name: any, data: any, addOpt: any): this;
    addPartial(name: any, config: any, options: any): this;
    replacePartial(name: any, config: any, options: any): this;
    getPartial(name: any): any;
    enablePartial(name: any, flag: any): void;
    getProfile(name: any): any;
    compose(options: any, ...profiles: any[]): any;
    deleteCustomProps(config: any): any;
}
export = WebpackConfigComposer;
