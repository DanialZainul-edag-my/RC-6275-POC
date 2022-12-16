<script setup>
// import { Background, Controls, MiniMap, Panel, PanelPosition } from '@vue-flow/additional-components'
import { VueFlow, isNode, useVueFlow } from '@vue-flow/core'
/* import the required styles */
import "@vue-flow/core/dist/style.css";
/* import the default theme (optional) */
// import "@vue-flow/core/dist/theme-default.css";
import { ref } from 'vue'
import { initialElements } from '../initial-elements'

/**
 * useVueFlow provides all event handlers and store properties
 * You can pass the composable an object that has the same properties as the VueFlow component props
 */
const { onPaneReady, onNodeDragStop, onConnect, addEdges, setTransform, toObject } = useVueFlow()

/**
 * Our elements
 */
const elements = ref(initialElements)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(({ fitView }) => {
  fitView()
})

onNodeDragStop((e) => console.log('drag stop', e))

/**
 * onConnect is called when a new connection is created.
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether
 */
onConnect((params) => addEdges([params]))

/**
 * To update node properties you can simply use your elements v-model and mutate the elements directly
 * Changes should always be reflected on the graph reactively, without the need to overwrite the elements
 */
const updatePos = () =>
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
const logToObject = () => console.log(toObject())

/**
 * Resets the current viewpane transformation (zoom & pan)
 */
const resetTransform = () => setTransform({ x: 0, y: 0, zoom: 1 })

onMounted(() => {
	assignClassToNode();
	assignClassToEdges();
})

function assignClassToNode() {
	const nodes = elements.value.filter(x => x.label)
	nodes?.forEach((el) => {
		let nodeClass = 'nodes '
		let nodeLabel = el.label?.toLowerCase()

		switch (true) {
			case nodeLabel.includes('canfd'):
				nodeClass += 'bg-canfd';
				break;
			case nodeLabel.includes('ethernet'):
				nodeClass += 'bg-ethernet'
				break;
			case nodeLabel.includes('lin'):
				nodeClass += 'bg-lin'
				break;
			case nodeLabel.includes('pt'):
				nodeClass += 'bg-pt'
				break;
			case nodeLabel.includes('hcp'):
				nodeClass += 'bg-hcp'
				break;
			case nodeLabel.includes('pm'):
				nodeClass += 'bg-pm'
				break;
		}
		return el.class = nodeClass
	})
}

function assignClassToEdges() {
	const edges = elements.value.filter(x => x.source && x.target)
	edges?.forEach((ed) => {
		switch (ed.status) {
			case 'ok':
				ed.style = { stroke: 'green' }
				break;
			case 'warning':
				ed.style = { stroke: 'yellow' }
				break;
			case 'error':
				ed.style = { stroke: 'red' }
				break;
			default:
				ed.style = { stroke: 'red' }
		}
	})
}

</script>

<template>
	<div>
		<h1>{{ $t('car.carECU') }}</h1>
	</div>

	<div class="flow-container">
		<VueFlow
			v-model="elements" 
			class="basicflow"
			:fit-view-on-init="true"
			:snap-to-grid="true"
		>
		</VueFlow>
	</div>
</template>

<style>
	.flow-container {
		width: 1000px;
		height: 500px;
		background-image: url('../assets/images/Audi_A8_top.png');
		background-position: center; /* Center the image */
		background-repeat: no-repeat; /* Do not repeat the image */
		background-size: contain; /* Resize the background image */
		border: 1px solid lightgrey;
		border-radius: 8px;
	}

	.vue-flow__edge-path { stroke-width: 3px } /* Sets the thickness of the edges/line connections */

	.nodes { color: #fff; text-align: center; border: 2px solid black; font-size: 14px; }
	.bg-canfd { background-color: darkblue;  width: 80px; }
	.bg-ethernet { background-color: green; width: 100px; }
	.bg-lin { background-color: darkmagenta; width: 50px; }
	.bg-pt { background-color: lightskyblue; width: 50px; }
	.bg-hcp { background-color: rgb(0, 119, 255); width: 55px; padding: 4px; }
	.bg-pm { background-color: red; padding: 8px; }
</style>