<template>
  <div class="drag-drop-app">
    <div class="container">
      <div class="column">
        <h3>Left Column</h3>
        <div class="column-content" @drop="onDropLeft($event, 'left')" @dragover.prevent>
          <draggable v-model="leftColumnItems" :itemKey="itemKey" class="drag-list">
            <template #item="{ element }">
              <div class="drag-item" :data-id="element.id" draggable="true" @dragstart="onDragStart">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="column">
        <h3>Right Column</h3>
        <div class="column-content" @drop="onDropRight($event, 'right')" @dragover.prevent>
          <draggable v-model="rightColumnItems" :itemKey="itemKey" class="drag-list">
            <template #item="{ element }">
              <div class="drag-item" :data-id="element.id" draggable="true" @dragstart="onDragStart">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
}

.column {
  flex: 1;
  padding: 10px;
}

.column-content {
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.drag-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  cursor: grab;
}

.item-content {
  flex: 1;
}
</style>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useDraggableStore, pinia } from './store';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'DraggableApp',
  components: {
    draggable,
  },
  setup() {
    const store = useDraggableStore(pinia);
    const leftColumnItems = ref(store.draggableItems);
    const rightColumnItems = ref(store.droppedItems);

    const itemKey = (item) => item.id.toString();

    const onDropLeft = (event, column) => {
      const itemId = event.dataTransfer.getData('number');
      const item = rightColumnItems.value.find((i) => i.id.toString() === itemId);

      if (item && column === 'left') {
        rightColumnItems.value.splice(rightColumnItems.value.indexOf(item), 1);
        leftColumnItems.value.push(item);
      }
    };

    const onDropRight = (event, column) => {
      const itemId = event.dataTransfer.getData('number');
      const item = leftColumnItems.value.find((i) => i.id.toString() === itemId);

      if (item && column === 'right') {
        leftColumnItems.value.splice(leftColumnItems.value.indexOf(item), 1);
        rightColumnItems.value.push(item);
      }
    };

    const onDragStart = (event) => {
      event.dataTransfer.setData('number', event.target.dataset.id);
    };

    watch(
        leftColumnItems,
        () => {
          store.draggableItems = leftColumnItems.value;
        },
        { deep: true }
    );

    watch(
        rightColumnItems,
        () => {
          store.droppedItems = rightColumnItems.value;
        },
        { deep: true }
    );

    return {
      leftColumnItems,
      rightColumnItems,
      itemKey,
      onDropLeft,
      onDropRight,
      onDragStart,
    };
  },
});
</script>
