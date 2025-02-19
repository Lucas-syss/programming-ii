const users = [
    { id: 1, name: "Alice", city: "Paris" },
    { id: 2, name: "Bob", city: "London" },
    { id: 3, name: "Charlie", city: "Paris" },
    { id: 4, name: "David", city: "New York" },
    { id: 5, name: "Eve", city: "London" },
    { id: 6, name: "Frank", city: "Berlin" },
    { id: 7, name: "Grace", city: "New York" },
    { id: 8, name: "Hannah", city: "Berlin" }
];

const groupedByCountry = Map.groupBy(users, name => name.city);

console.log(groupedByCountry);