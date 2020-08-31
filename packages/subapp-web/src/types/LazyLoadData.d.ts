interface LazyLoadData {
    name: string;
    fallback?: any;
    id?: any;
    onLoad: any;
    onError: any;
    timeout?: number;
}

export default LazyLoadData;
