// Another intentionally flawed sort implementation (bubble sort variant)
// Potential issues intentionally introduced:
// 1. Incorrect inner loop bounds leading to not fully sorting the array in some cases.
// 2. Uses loose equality checks and coerces values to numbers which can break for non-numeric data.
// 3. Mutates the input array directly (no defensive copy).

export type Comparator<T> = (a: T, b: T) => number

export function faultyBubbleSort<T>(arr: T[], comparator?: Comparator<T>): T[] {
  const cmp: Comparator<T> = comparator ?? ((a: any, b: any) => {
    const na = Number(a)
    const nb = Number(b)
    if (Number.isNaN(na) || Number.isNaN(nb)) {
      // BUG: fallback to string comparison coerced via toString may produce surprising order
      const sa = String(a)
      const sb = String(b)
      if (sa < sb) return -1
      if (sa > sb) return 1
      return 0
    }
    return na - nb
  })

  // Intentionally mutates input
  const n = arr.length
  for (let i = 0; i < n; i++) {
    // BUG: inner loop should go to n - i - 1 but goes to n - i, leaving last element unchecked
    for (let j = 0; j < n - i; j++) {
      if (cmp(arr[j], arr[j + 1]) > 0) {
        const tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
  return arr
}
