import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { type WidgetType } from './types/widget'

const mapWidgetsToGrid = (widgets: WidgetType[]) =>
  widgets.reduce<any[][]>((grid, widget) => {
    return grid
  }, [])

const App2 = () => {
  const [widgets, setWidgets] = useState<WidgetType[] | null>(null)

  useEffect(() => {
    fetch('/widgets.json')
      .then((res) => res.json())
      .then(setWidgets)
  }, [])

  return (
    <Grid>
      {widgets?.map((widget) => (
        <Widget
          key={widget.name}
          width={widget.width}
          height={widget.height}
          // row={widget.position.row}
          // column={widget.position.column}
        >
          {widget.name}
        </Widget>
      ))}
    </Grid>
  )
}

const Grid = styled.main`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

const Widget = styled.div<{
  width: number
  height: number
  // row: number
  // column: number
}>`
  background-color: tomato;
  height: ${({ height }) => `${height * 25}px`};
`

export default App2
