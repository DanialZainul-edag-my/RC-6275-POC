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

</script>

<template>
	<div>
		<h1>{{ $t('car.carECU') }}</h1>
	</div>

	<div class="container" style="width: 1000px; height: 500px;">
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
	.basicflow { background-color: rgb(229, 253, 248); }

	.nodes { color: #fff; text-align: center; border: 2px solid black }
	.bg-canfd { background-color: darkblue;  width: 80px; }
	.bg-ethernet { background-color: green; width: 100px; }
	.bg-lin { background-color: darkmagenta; width: 50px; }
	.bg-pt { background-color: lightskyblue; width: 50px; }
	.bg-hcp { background-color: rgb(0, 119, 255); width: 55px; padding: 4px; }
	.bg-pm { background-color: red; padding: 8px; }
</style>