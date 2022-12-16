// node => id, position: {x,y}
// edges (lines) => id, sourcePosition (starting node id, going out) and targetPosition (ending node id, coming in)

import { Position } from '@vue-flow/core'

/**
 * You can pass elements together as a v-model value
 * or split them up into nodes and edges and pass them to the `nodes` and `edges` props of Vue Flow (or useVueFlow composable)
 */
export const initialElements = [
  { id: '10',
    type: 'input',
    label: 'Zelda CANFD 2',
    position: { x: 0, y: 0 },
    sourcePosition: Position.Left,
  },
  { id: '11', label: 'Zelda CANFD 4', position: { x: 85, y: 0 } },
  { id: '12', label: 'Zelda CANFD 5', position: { x: 170, y: 0 } },
  { id: '13', label: 'Zelda CANFD 6', position: { x: 255, y: 0 } },
  { id: '14', label: 'Zelda CANFD 3', position: { x: 750, y: 175 }, targetPosition: Position.Left, },
  { id: '15', label: 'Zelda CANFD 7', position: { x: 835, y: 175 } },

  { id: '20', label: 'Zelda LIN 2', position: { x: 750, y: 230 }, targetPosition: Position.Left, },
  { id: '21', label: 'Zelda LIN 3', position: { x: 805, y: 230 } },
  { id: '22', label: 'Zelda LIN 4', position: { x: 860, y: 230 } },

  { id: '50', label: 'HCP1', position: { x: 150, y: 215 } },
  { id: '51', label: 'HCP3', position: { x: 90, y: 175 } },
  { id: '52', label: 'HCP4', position: { x: 150, y: 175 } },
  { id: '53', label: 'HCP5', position: { x: 350, y: 215 } },
  
  { id: '30', label: 'PT-15 1', position: { x: 750, y: 285 }, targetPosition: Position.Left, },
  { id: '31', label: 'PT-15 2', position: { x: 805, y: 285 } },
  { id: '32', label: 'PT-20', position: { x: 750, y: 345 }, targetPosition: Position.Left, },

  { id: '40', label: 'Ethernet Switch', position: { x: 100, y: 75 }, targetPosition: Position.Left, sourcePosition: Position.Right, },
  { id: '41', label: 'Ethernet Switch', position: { x: 600, y: 75 }, targetPosition: Position.Left, sourcePosition: Position.Bottom, },

  { id: '90', label: 'PM200', position: { x: 750, y: 75 }, targetPosition: Position.Left },

  // Edges / Connections
  {
    id: 'e10-40',
    type: 'smoothstep',
    source: '10',
    target: '40',
    status: 'ok',
  },
  {
    id: 'e40-41',
    type: 'smoothstep',
    source: '40',
    target: '41',
    status: 'warning',
  },
  {
    id: 'e41-90',
    type: 'smoothstep',
    source: '41',
    target: '90',
    status: 'error',
  },
  {
    id: 'e41-14',
    type: 'smoothstep',
    source: '41',
    target: '14',
    status: 'ok',
  },
  {
    id: 'e41-20',
    type: 'smoothstep',
    source: '41',
    target: '20',
    status: 'error',
  },
  {
    id: 'e41-30',
    type: 'smoothstep',
    source: '41',
    target: '30',
    status: 'ok',
  },
  {
    id: 'e41-32',
    type: 'smoothstep',
    source: '41',
    target: '32',
    status: 'ok',
  },
]
