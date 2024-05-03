

export type MakeWritable<T> = { -readonly [P in keyof T]: T[P] };
export type GetElementType<T extends any[]> = T extends (infer U)[]? U :never

export type PageSlug = {
  params: {
    slug: string
  }
}