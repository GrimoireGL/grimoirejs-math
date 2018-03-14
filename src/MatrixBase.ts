
export default abstract class MatrixBase<T extends Float32Array> {

  public rawElements!: T;

  protected static __elementEquals<T extends Float32Array>(m1: MatrixBase<T>, m2: MatrixBase<T>): boolean {
    if (m1.RowCount !== m2.RowCount || m1.ColmunCount !== m2.ColmunCount) {
      return false;
    }
    const count = m1.RowCount * m2.ColmunCount;
    for (let i = 0; i < count; i++) {
      if (m1.getBySingleIndex(i) !== m2.getBySingleIndex(i)) {
        return false;
      }
    }
    return true;
  }

  abstract get RowCount(): number;
  abstract get ColmunCount(): number;

  abstract getAt(row: number, colmun: number): number;
  abstract getBySingleIndex(index: number): number;
}

