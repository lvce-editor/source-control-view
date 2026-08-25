declare const URL: {
  canParse(url: string, base?: string): boolean
  new (
    url: string,
    base: string,
  ): {
    readonly href: string
  }
}
