import { useEffect, useState } from 'react'

import {
  type Layout,
  Responsive as ResponsiveGridLayout,
} from 'react-grid-layout'
import styled from 'styled-components'

import { fixLayout, mapLayoutToWidgets, mapWidgetsToLayout } from './App.utils'

import { WidgetType } from './types/widget'

const HEADER_HEIGHT = 120
const WIDGETS_AREA_HEIGHT = window.innerHeight - HEADER_HEIGHT

const Grid = () => {
  const [widgets, setWidgets] = useState<WidgetType[] | null>(null)
  const [layout, setLayout] = useState<Layout[]>([])

  useEffect(() => {
    fetch('/widgets.json')
      .then((res) => res.json())
      .then((widgets) => {
        setWidgets(widgets)
        setLayout(mapWidgetsToLayout(widgets))
      })
  }, [])

  return (
    <>
      <Header />
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        cols={{ lg: 3 }}
        breakpoints={{ lg: 1200 }}
        rowHeight={WIDGETS_AREA_HEIGHT / 3}
        maxRows={2}
        width={window.innerWidth}
        isResizable={false}
        // onLayoutChange={(l) => setLayout(fixLayout(l))}
        onLayoutChange={setLayout}
      >
        {widgets?.map((widget) => (
          <Widget key={widget.name}>{widget.name}</Widget>
        ))}
      </ResponsiveGridLayout>
      <button onClick={() => console.log(mapLayoutToWidgets(layout))}>
        Log layout
      </button>
      {widgets && (
        <p>
          Free space:{' '}
          {216 -
            widgets.reduce(
              (res, widget) => res + widget.width * widget.height,
              0
            )}{' '}
          cells
        </p>
      )}
    </>
  )
}

const Header = styled.header`
  height: ${HEADER_HEIGHT}px;
  background-color: light;
`

const Widget = styled.div`
  background-color: tomato;
`

export default Grid
