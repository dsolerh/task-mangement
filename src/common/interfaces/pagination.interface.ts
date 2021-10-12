export interface IPagination<Type> {
  meta: {
    total: number;
    count: number;
  };
  data: Type[];
}
