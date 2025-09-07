import { test, expect } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VisibleItem } from '../src/parts/VisibleItem/VisibleItem.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createItemDirectory } from '../src/parts/CreateItemDirectory/CreateItemDirectory.ts'
import * as DirentType from '../src/parts/DirentType/DirentType.ts'
import * as TreeItemPadding from '../src/parts/TreeItemPadding/TreeItemPadding.ts'

test('createItemDirectory - basic directory', () => {
  const item: VisibleItem = {
    posInSet: 1,
    setSize: 2,
    icon: 'Directory',
    label: 'test',
    badgeCount: 0,
    decorationStrikeThrough: false,
    type: DirentType.Directory,
    buttons: [],
    file: 'test',
    detail: '',
    decorationIcon: '',
    decorationIconTitle: '',
    groupId: 'test',
    fileIcon: 'Directory',
  }
  const result = createItemDirectory(item)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItem,
      role: 'treeitem',
      ariaExpanded: false,
      ariaPosInSet: 1,
      ariaSetSize: 2,
      childCount: 3,
      paddingLeft: TreeItemPadding.PaddingLeft,
      paddingRight: TreeItemPadding.PaddingRight,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconDirectory',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
    {
      childCount: 0,
      className: 'SourceControlButtons',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: 4,
    },
    {
      childCount: 0,
      text: '0',
      type: 12,
    },
  ])
})

test('createItemDirectory - expanded directory with badge and buttons', () => {
  const item: VisibleItem = {
    posInSet: 1,
    setSize: 2,
    icon: 'Directory',
    label: 'test',
    badgeCount: 1,
    decorationStrikeThrough: false,
    type: DirentType.DirectoryExpanded,
    buttons: [
      {
        command: 'delete',
        icon: 'delete',
        label: 'Delete',
      },
    ],
    file: 'test',
    detail: '',
    decorationIcon: '',
    decorationIconTitle: '',
    groupId: 'test',
    fileIcon: 'Directory',
  }
  const result = createItemDirectory(item)
  expect(result).toEqual([
    {
      ariaExpanded: true,
      ariaPosInSet: 1,
      ariaSetSize: 2,
      childCount: 4,
      className: 'TreeItem',
      paddingLeft: '1rem',
      paddingRight: '12px',
      role: 'treeitem',
      type: 4,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconDirectory',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'test',
      type: 12,
    },
    {
      childCount: 1,
      className: 'SourceControlButtons',
      type: 4,
    },
    {
      ariaLabel: 'Delete',
      childCount: 1,
      className: 'SourceControlButton',
      name: 'Delete',
      title: 'Delete',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIcondelete',
      role: 'none',
      type: 8,
    },
    {
      childCount: 1,
      className: 'Badge SourceControlBadge',
      type: 4,
    },
    {
      childCount: 0,
      text: '1',
      type: 12,
    },
  ])
})
