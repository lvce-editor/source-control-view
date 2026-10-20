import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const rendererWorkerUrl = /\/renderer-worker\/src\/rendererWorkerMain/

export const test = async ({ page }) => {
  let stage = 'setup'
  try {
    await page.locator('#TestOverlay').evaluate((element) => element.remove())
    const worker = page.workers().find((entry) => rendererWorkerUrl.test(entry.url()))
    assert.ok(worker, 'Use the application source runtime for this regression')
    await worker.evaluate(async () => {
      const { state } = await import('/packages/renderer-worker/src/parts/IsTest/IsTest.js')
      state.isTest = false
    })
    const entry = await page.locator('script[type="module"][src]').evaluateAll((scripts) => scripts.find((script) => script.src.includes('rendererProcessMain')).src)
    const execute = (method, ...params) =>
      page.evaluate(async ({ entry, method, params }) => (await import(entry)).executeCommand(method, ...params), { entry, method, params })
    const source = page.locator('.SourceControl')
    const input = source.locator('textarea[name="SourceControlInput"]')
    await input.fill('acceptance commit')
    assert.equal(await input.inputValue(), 'acceptance commit')
    await page.locator('.SideBarTitleArea [name="ViewAsTree"]').click()
    await page.locator('.SideBarTitleArea [name="ViewAsList"]').waitFor({ state: 'visible' })
    await page.locator('.SideBarTitleArea [name="ViewAsList"]').click()
    await page.locator('.SideBarTitleArea [name="ViewAsTree"]').waitFor({ state: 'visible' })

    stage = 'native scrolling'
    const thumb = source.locator('.ScrollBarThumb')
    const before = await thumb.evaluate((element) => getComputedStyle(element).translate)
    const box = await source.boundingBox()
    assert.ok(box)
    await page.mouse.move(box.x + 30, box.y + 200)
    await page.mouse.wheel(0, 200)
    await page.waitForFunction((previous) => getComputedStyle(document.querySelector('.SourceControl .ScrollBarThumb')).translate !== previous, before)
    const after = await thumb.evaluate((element) => getComputedStyle(element).translate)
    await page.mouse.wheel(0, -20000)
    stage = 'context menu'
    const file = source.locator('.TreeItem[title="0.css"]')
    await file.waitFor({ state: 'visible' })
    await file.hover()
    await file.click({ button: 'right' })
    await page.locator('.Menu').waitFor({ state: 'visible' })
    const menu = await page.locator('.Menu .MenuItem').allTextContents()
    assert.ok(menu.some((text) => text.trim() === 'Open File'))
    stage = 'open file'
    await page.getByRole('menuitem', { name: 'Open File', exact: true }).click()
    await page.waitForFunction(() => document.querySelector('.Editor .EditorRow')?.textContent.includes('source-control-0'))
    await file.hover()
    stage = 'stage file'
    await file.locator('button[name="Stage"]').click()
    await page.waitForFunction(() => document.querySelector('.SourceControlItems')?.textContent.includes('Staged Changes'))
    stage = 'hide/show focus'
    for (let index = 0; index < 2; index++) {
      await execute('SideBar.show', 'Explorer', true)
      await page.locator('.Explorer').waitFor({ state: 'visible' })
      await page.keyboard.press('ControlOrMeta+Shift+g')
      await input.waitFor({ state: 'visible' })
      await page.waitForFunction(() => document.activeElement?.name === 'SourceControlInput')
      assert.equal(await input.inputValue(), 'acceptance commit')
    }
    const evidence = process.env.SOURCE_CONTROL_NATIVE_EVIDENCE_DIR
    if (evidence) {
      await mkdir(evidence, { recursive: true })
      await page.screenshot({ path: join(evidence, 'source-control-native.png') })
      await writeFile(
        join(evidence, 'result.json'),
        JSON.stringify({ input: true, viewModes: true, scroll: { before, after }, menu, openFile: true, stage: true, hideShowFocus: true }, null, 2),
      )
    }
  } catch (error) {
    const evidence = process.env.SOURCE_CONTROL_NATIVE_EVIDENCE_DIR
    if (evidence) {
      await mkdir(evidence, { recursive: true })
      await page.screenshot({ path: join(evidence, 'failure.png') })
      await writeFile(join(evidence, 'failure.json'), JSON.stringify({ stage, error: String(error), dom: await page.locator('body').innerText() }, null, 2))
    }
    throw new Error(`Source control native regression: ${stage}`, { cause: error })
  }
}
