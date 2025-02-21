
export function convertUSDToEUR(amount) {  
    const rate = fetchExchangeRate(); 
    return amount * rate;  
}

export function fetchExchangeRate() {
    return 1;
}