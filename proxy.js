export function createAccessTracker(obj) {
    const accessed = new Set();
    const proxy = new Proxy(obj, {
        get(target, prop, receiver) {
            accessed.add(prop);
            return Reflect.get(target, prop, receiver);
        }
    });

    proxy.getUnusedFields = function() {
        return Object.keys(obj).filter(f => !accessed.has(f));
    };

    proxy.logUnusedFields = function() {
        const unused = proxy.getUnusedFields();
        if (unused.length > 0) {
            console.warn("Unused:", unused);
        }
    };

    return proxy;
}
