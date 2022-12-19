<script setup>
// import { Background, Controls, MiniMap, Panel, PanelPosition } from '@vue-flow/additional-components'
import { VueFlow, isNode, useVueFlow } from '@vue-flow/core'
/* import the required styles */
import "@vue-flow/core/dist/style.css";
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

const selectedNode = ref({})
const showNodeDialog = ref(false)
const selectedEdge = ref({})
const showEdgeDialog = ref(false)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 *
 * onPaneReady is called when viewpane & nodes have visible dimensions
 */
onPaneReady(() => {
	setTransform({ x: 220, y: 110, zoom: 0.75 })
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
				ed.style = { stroke: 'orange' }
				break;
			case 'error':
				ed.style = { stroke: 'red' }
				break;
			default:
				ed.style = { stroke: 'red' }
		}
	})
}

const onClickNode = (node) => {
	showNodeDialog.value = !showNodeDialog.value;	
	selectedNode.value = node.node

	if (node.connectedEdges.length > 0) {
		selectedNode.value.connectedEdges = [ ...node.connectedEdges ]
	}
}
const onClickEdge = (edge) => {
	showEdgeDialog.value = !showEdgeDialog.value;	
	selectedEdge.value = edge.edge
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
			:snap-to-grid="true"
			:nodes-draggable="false"
			:zoom-on-scroll="false"
			zoom-activation-key-code="ctrl"
			:pan-on-drag="false"
			@node-click="onClickNode"
			@edge-click="onClickEdge"
		>
		</VueFlow>
	</div>

	<!-- popup on click node (ECU / bus system) -->
	<v-dialog
		v-model="showNodeDialog"
		width="500"
	>
		<v-card class="pa-4">
			<div class="d-flex justify-space-between align-center">
				<v-card-title class="font-weight-bold">{{ selectedNode.label }}</v-card-title>
				<v-btn 
					icon="mdi-close" 
					variant="text"
					@click="showNodeDialog = !showNodeDialog"
				></v-btn>
			</div>
			
			<template v-if="selectedNode.connectedEdges">
				<span class="px-4 py-2">{{ $t('general.connections') }}:</span>
				<v-table>
					<thead>
						<tr>
							<th class="text-left">{{ $t('general.no') }}</th>
							<th class="text-left">{{ $t('general.connectionID') }}</th>
							<th class="text-left">{{ $t('general.status') }}</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(edge, index) in selectedNode.connectedEdges"
							:key="edge.id"
						>
							<td>{{ index + 1 }}</td>
							<td>{{ edge.id }}</td>
							<td
								class="text-capitalize"
								:class="edge.status === 'ok' ? 'text-green' : edge.status === 'warning' ? 'text-orange' : 'text-red'"
							>{{ edge.status }}</td>
						</tr>
					</tbody>
				</v-table>
			</template>
			<template v-else>
				<span class="px-4 py-2">{{ $t('general.noConnectionAvailable') }}</span>
			</template>
		</v-card>
	</v-dialog>

	<!-- popup on click edge (connection lines) -->
	<v-dialog
		v-model="showEdgeDialog"
		width="500"
	>
		<v-card class="pa-4">
			<div class="d-flex justify-space-between align-center">
				<v-card-title class="font-weight-bold">{{ selectedEdge.id }}</v-card-title>
				<v-btn 
					icon="mdi-close" 
					variant="text"
					@click="showEdgeDialog = !showEdgeDialog"
				></v-btn>
			</div>
			
			<v-table>
				<thead>
					<tr>
						<th class="text-left">{{ $t('general.sourceNode') }} ({{ $t('general.id') }})</th>
						<th class="text-left">{{ $t('general.targetNode') }} ({{ $t('general.id') }})</th>
						<th class="text-left">{{ $t('general.status') }}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ selectedEdge.sourceNode.label }} ({{ selectedEdge.sourceNode.id }})</td>
						<td>{{ selectedEdge.targetNode.label }} ({{ selectedEdge.targetNode.id }})</td>
						<td
							class="text-capitalize"
							:class="selectedEdge.status === 'ok' ? 'text-green' : selectedEdge.status === 'warning' ? 'text-orange' : 'text-red'"
						>{{ selectedEdge.status }}</td>
					</tr>
				</tbody>
			</v-table>
		</v-card>
	</v-dialog>
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
	.bg-canfd { background-color: rgb(0,32,99);  width: 80px; }
	.bg-ethernet { background-color: rgb(0,152,79); width: 100px; }
	.bg-lin { background-color: rgb(115,61,166); width: 50px; }
	.bg-pt { background-color: rgb(0,162,245); width: 50px; }
	.bg-hcp { background-color: rgb(0,105,200); width: 55px; padding: 4px; }
	.bg-pm { background-color: rgb(207,28,47); padding: 8px; }
</style>