function objectToSearchParams(obj: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    function appendParams(params: URLSearchParams, key: string, value: any): void {
        if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
        } else {
            params.append(key, value);
        }
    }

    Object.keys(obj).forEach(key => {
        appendParams(searchParams, key, obj[key]);
    });

    return searchParams.toString();
}

export {
    objectToSearchParams
}