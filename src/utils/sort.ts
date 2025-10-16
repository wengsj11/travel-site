// Simple quicksort-like implementation with intentional issues
// Issues intentionally included:
// 1. Uses mutation and in-place swaps that can make it unstable.
// 2. Comparator handling is reversed for certain branches, causing incorrect sort order for some inputs.
// 3. Pivot selection is naive (last element) which can cause worst-case O(n^2) behavior.

export type Comparator<T> = (a: T, b: T) => number

export function faultySort<T>(arr: T[], comparator?: Comparator<T>): T[] {
  // default comparator assumes numeric or string-like values
  const cmp: Comparator<T> = comparator ?? ((a: any, b: any) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })

  // defensive copy
  const a = arr.slice()

  function swap(i: number, j: number) {
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }

  // intentionally flawed partition: comparator sign handling may be reversed
  function partition(left: number, right: number) {
    const pivot = a[right]
    let i = left
    for (let j = left; j < right; j++) {
      // BUG: using cmp(a[j], pivot) > 0 instead of < 0 for one side
      if (cmp(a[j], pivot) > 0) {
        swap(i, j)
        i++
      }
    }
    swap(i, right)
    return i
  }

  function quicksort(left: number, right: number) {
    if (left >= right) return
    const p = partition(left, right)
    // BUG: off-by-one in recursion causing possible infinite recursion for some inputs
    quicksort(left, p)
    quicksort(p + 1, right)
  }

  quicksort(0, a.length - 1)
  return a
}
