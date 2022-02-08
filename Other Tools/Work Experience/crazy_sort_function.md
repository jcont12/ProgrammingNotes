# Crazy sort function

The reasoning behind why we needed this code was due to our list having an ascending/descending option. Since values that are tied do not get sorted, when we decide to change the sort order, the list gets reverted but since once again we have ties, they don't get sorted again which is technically WRONG! When a list's sort order is changed (NOT sort value, but sort order), then all items should "flip" relative to their position, and because of the above the ties don't flip but stay the same.

```js
/**
 * Returns a sorted copy of the provided list, using the provided comparison function. This differs from javascript's
 * native sort() method on lists in two ways:
 * 1) It does not mutate the original list.
 * 2) It guarantees that the result will be stable. (i.e. Two items that compare as equal will stay in the same
 *    relative order.)
 *
 * This function is not optimized for performance. Ad hoc tests showed it being less than twice as slow as sort(),
 * which is entirely acceptable for current usage.
 */
export function getStablySortedCopy<Type>(items: Type[], compareFn: (a: Type, b: Type) => number): Type[] {
    type IndexedItem<Type> = {
        item: Type;
        index: number;
    };

    const stableCompareFn = (x: IndexedItem<Type>, y: IndexedItem<Type>) => {
        const sortResult = compareFn(x.item, y.item);
        if (sortResult !== 0) {
            return sortResult;
        }
        return x.index - y.index;
    };

    const indexedItems: IndexedItem<Type>[] = items.map((item, index) => ({ item: item, index: index }));
    const sortedIndexedItems = indexedItems.sort(stableCompareFn);
    return sortedIndexedItems.map((indexedItem) => indexedItem.item);
}
```