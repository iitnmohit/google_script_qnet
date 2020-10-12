export class MultiMap<K, V> {
    private readonly map: Map<K, Array<V>>;

    constructor () {
        this.map = new Map<K, Array<V>>();
    }

    public clear(): void {
        this.map.clear();
    }

    public size(): number {
        return this.map.size;
    }

    public delete(k: K): boolean {
        return this.map.delete(k);
    }

    public has(k: K): boolean {
        return this.map.has(k);
    }

    public set(k: K, v: V): void {
        if (this.map.has(k)) {
            this.map.get(k).unshift(v);
        } else {
            this.map.set(k, [v]);
        }
    }

    public get(k: K): V {
        if (this.map.has(k)) {
            return this.map.get(k)[0];
        }
        return null;
    }

    public getAll(k: K): V[] {
        if (this.map.has(k)) {
            return this.map.get(k);
        }
        return null;
    }
}