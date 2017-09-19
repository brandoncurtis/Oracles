# Oracles

By design, the Ethereum blockchain is unable to communicate with data and programs outside of the Ethereum Virtual Machine.  In order to get data from an outside source, such as pricing data from an exchange, an 'Oracle' is needed to put the data onto the Ethereum blockchain.  DDA is currently acting as the oracle for DDA swaps and uses a robust methodology for calculating End-of-Day (EOD) prices for Ether and Bitcoin.

DDA can also provide private oracles for custom swaps and plans to expand the list of supported currencies. 


Current Oracle Addresses - Ropsten
    ETH/USD -0xc78fe159230e4bab28c3f7cba53967e0be3ee48e
    BTC/USD - 0x30346e7efc7b892c29989ce4374fc1af55acc8c3

Methodology

- Pull 1600 EST prices from various exchanges

-Drop highest and lowest value

- Use 24 hour volume weighted average to then calculate the price

           Price = sum(volume * price)  / sum (volume)
           
-Multiply price by 1000 since EVM does not support decimal places

-Push to Oracle contract on Ethereum blockchain



Exchange List

BTC/USD 
        Bitfinex
        GDAX
        Bitstamp
        Poloniex
        Gemini



ETH/USD
        Bitfinex
        GDAX
        Kraken
        Poloniex
        Gemini
