import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';
import Observable, { NestedRecord } from './Observable';

type MergeObj<T, U> = T & U;

type Merge<T extends NestedRecord<unknown>[]> = T extends [
  infer First,
  ...infer Rest,
]
  ? First extends NestedRecord<unknown>
    ? Rest extends NestedRecord<unknown>[]
      ? MergeObj<First, Merge<Rest>>
      : never
    : never
  : NonNullable<unknown>;

type UnifiedObservables<T extends NestedRecord<unknown>[]> = {
  [K in keyof T]: Observable<T[K]>;
};

export default class UnifiedObservable<
  T extends NestedRecord<unknown>[] = [],
> extends Observable<Merge<T>> {
  private mergedTrees: { [K in keyof T]: Observable<T[K]> };

  constructor(...trees: UnifiedObservables<T>) {
    const mergedValue = UnifiedObservable.mergeTreeValues(trees);
    super(mergedValue);
    this.mergedTrees = trees;
    this.initialize();
  }

  private static mergeTreeValues<U extends NestedRecord<unknown>[]>(
    trees: UnifiedObservables<U>,
  ): Merge<U> {
    return trees.reduce(
      (merged, tree) => assign(merged, tree.value),
      {} as Merge<U>,
    );
  }
  private initialize(): void {
    this.mergedTrees.forEach((tree) => {
      tree.subscribe((current, previous) => {
        if (previous !== current) {
          this.value = UnifiedObservable.mergeTreeValues(
            this.mergedTrees,
          ) as Merge<T>;
          super.notifyListeners(this.computeAffectedPaths(''));
        }
      });
    });
  }

  protected notifyListeners(affectedPaths: string[]): void {
    super.notifyListeners(affectedPaths);

    this.mergedTrees.forEach((tree) => {
      const treeClone = cloneDeep(tree.value);
      assign(treeClone, this.value);
      // eslint-disable-next-line no-param-reassign
      tree.value = treeClone;
    });
  }
}
