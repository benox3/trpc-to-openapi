export const acceptsRequestBody = (method) => {
    if (method === 'GET' || method === 'DELETE') {
        return false;
    }
    return true;
};
//# sourceMappingURL=method.js.map