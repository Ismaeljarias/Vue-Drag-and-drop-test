// store.js
import {createPinia, defineStore} from 'pinia';

export const pinia = createPinia();
export const useDraggableStore = defineStore('draggable', {
    state: () => ({
        draggableItems: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
        ],
        droppedItems: [],
    }),
});
