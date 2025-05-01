export interface DisplayItem {
  readonly file: string
  readonly label: string
  readonly detail: string
  readonly posInSet: number
  readonly setSize: number
  readonly icon: string
  readonly decorationIcon: string
  readonly decorationIconTitle: string
  readonly decorationStrikeThrough: boolean
  readonly type: number
  readonly badgeCount: number
  readonly groupId: string
}
