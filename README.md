# Source Control Worker

Web Worker for the source control functionality in LVCE Editor.

## Contributing

```sh
git clone git@github.com:lvce-editor/source-control-worker.git &&
cd source-control-worker &&
npm ci &&
npm test
```

## Source control context menus

Extensions contribute context-menu commands through `source-control-actions` in
`extension.json`. Keys are the source-control group id (for group menus) or the
group id followed by `-item` (for file menus). Each action has a `command`,
`label`, and toolbar `icon`. Contributions from multiple extensions are combined.
For example, an action under `working-tree-item` appears for working-tree files;
an action under `index-item` appears for staged files.

Menu commands receive the same repository-relative file argument as toolbar
actions, activate the contributing command, and refresh source control after
completion. Built-in file actions open changes, the file, its original contents,
or reveal it in Explorer. Native platforms also offer Open Containing Folder.
Provider-specific operations, including Stage, Discard, and Add to Gitignore,
are supplied by extensions rather than inert built-in menu entries.
