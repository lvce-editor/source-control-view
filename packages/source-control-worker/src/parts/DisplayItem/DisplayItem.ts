export interface DisplayItem {
  readonly badgeCount: number
  readonly decorationIcon: string
  readonly decorationIconTitle: string
  readonly decorationStrikeThrough: boolean
  readonly depth?: number
  readonly detail: string
  readonly directory?: string
  readonly file: string
  readonly groupId: string
  readonly icon: string
  readonly label: string
  readonly posInSet: number
  readonly setSize: number
  readonly type: number
}
