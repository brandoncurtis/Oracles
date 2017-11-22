# Oracles

By design, the Ethereum blockchain is unable to communicate with data and programs outside of the Ethereum Virtual Machine.  In order to get data from an outside source, such as pricing data from an exchange, an 'Oracle' is needed to put the data onto the Ethereum blockchain.  DDA is currently acting as the oracle for DDA swaps and uses a robust methodology for calculating End-of-Day (EOD) prices for Ether and Bitcoin.


Current Oracle Addresses - Ropsten   (Currently in Beta)

    ETH/USD -0x8d0b9f591dabcf866a07f1d11012cd7e7a3e1d9b
    BTC/USD - 0x0136c266e3a32c0f493a66556565014d8a581552


Solidity Code - https://github.com/DecentralizedDerivatives/Deriveth/blob/master/Oracle.sol



Methodology

- Pull 1600 EST prices from various exchanges

- Drop highest and lowest value

- Use 24 hour volume weighted average to then calculate the price

           Price = sum(volume * price)  / sum (volume)
           
- Multiply price by 1000 since EVM does not support decimal places

- Push to Oracle contract on Ethereum blockchain



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

