function findDuplicates(array) {
    const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
    return duplicates;
}
console.log(findDuplicates([1,1,1,2,2,3,3,3,4,5,5]));