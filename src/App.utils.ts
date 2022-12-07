import * as R from 'ramda'

import { type Layout } from 'react-grid-layout'
import { type WidgetType } from './types/widget'

export const mapWidgetToLayout = (widget: WidgetType): Layout => ({
  i: widget.name,
  w: widget.width / 6,
  h: widget.height / 6,
  x: widget.x / 6,
  y: widget.y / 6,
})

export const mapLayoutToWidget = (layout: Layout) => ({
  name: layout.i,
  width: layout.w,
  height: layout.h,
  x: layout.x,
  y: layout.y,
})

export const mapWidgetsToLayout = R.map(mapWidgetToLayout)
export const mapLayoutToWidgets = R.map(mapLayoutToWidget)

export const fixLayout = (layout: Layout[]): Layout[] => {
  // `y` is calculated by `h` in the layout object, since `h` is 20
  // first row will be 0, second 20, third 40
  const maxY = 1

  // when an item goes to a new row, there is an empty column in the maxY row
  // so here we find which columns exist
  // tslint:disable-next-line:max-line-length
  const maxRowXs = layout
    .map((item) => (item.y === maxY ? item.x : null))
    .filter((value) => value !== null)

  // xs or cols, we only have 3 cols
  const xs = [0, 1, 2]

  // find the missing col
  // tslint:disable-next-line:max-line-length
  const missingX = xs.find((value) =>
    maxRowXs.every((maxRowX) => maxRowX !== value)
  )!

  // bring the item from the new row into maxY row
  // and place it in the missing column
  const fixedLayout = layout.map((item) => {
    if (item.y > maxY) {
      const fixedItem: Layout = {
        ...item,
        y: maxY,
        x: missingX,
      }

      return fixedItem
    }

    return item
  })

  return fixedLayout
}
