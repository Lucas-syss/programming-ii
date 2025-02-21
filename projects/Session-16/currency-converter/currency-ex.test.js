import { convertUSDToEUR } from './currency-exchange.js';

test("convert USD 100 to EUR 90", () => {
    const dollar = 100;
    const mockExchangeRate = 0.90;  

    jest.spyOn(exchangeRateModule, 'fetchExchangeRate').mockReturnValue(mockExchangeRate);

    const expectedAmountInEUR = dollar * mockExchangeRate;  
    const result = convertUSDToEUR(dollar);
    
    expect(result).toBe(expectedAmountInEUR);  

    exchangeRateModule.fetchExchangeRate.mockRestore();
});
