const generateItems = (numItems) => {
    const items = [];
    for (let i = 0; i < numItems + 1; i++) {
        const weight = Math.floor(Math.random() * 10) + 1;  
        const value = Math.floor(Math.random() * 100) + 1; 
        items.push({ weight, value });
    }
    return items;
};

const items = generateItems(10);
const capacity = 10;

function knapsack(items, capacity) {
    const dpTable = new Array(capacity + 1).fill(0);
    const itemSelection = new Array(items.length).fill(false); 

    for (let i = 0; i < items.length; i++) {
        for (let w = capacity; w >= items[i].weight; w--) { 
            const newValue = dpTable[w - items[i].weight] + items[i].value;
            if (newValue > dpTable[w]) {
                dpTable[w] = newValue;
                itemSelection[i] = true;  
            }
        }
    }
 
    let w = capacity;
    const usedItems = [];
    for (let i = items.length - 1; i >= 0; i--) {
        if (itemSelection[i] && w >= items[i].weight) {
            usedItems.push(items[i]);
            w -= items[i].weight; 
            usedItems.sort((a, b) => a.weight - b.weight);
        }
    }

    console.log("Items used to fill the knapsack:");
    usedItems.forEach((item, index) => {
        console.log(`Item ${index}, Weight: ${item.weight}, Value: ${item.value}`);
    });

    return dpTable[capacity];
}

console.log(`Total value of all items: ${knapsack(items, capacity)}`);
