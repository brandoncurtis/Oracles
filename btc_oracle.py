'''Methodology
Exchange list is examined every month
Current List:
Bitfinex
GDAX
Bitstamp
Poloniex
Gemini


The oracle is currently updated at 1600 EST, however manual intervention may delay this from an exact time push
	-as testing continues and API's prove reliable, manual checking will go down
	-this allows multiple or manual attempts if API is non-responsive

Top and Bottom exchanges are dropped from calculation

Math:
Price = sum(volume * price) at each exchange / sum (volume at each exchange)
'''


#Bitfinex

import requests,json, time
import pandas as pd
from Naked.toolshed.shell import execute_js, muterun_js, run_js


date = time.strftime("%Y%m%d")


def Bittrex():
	url = "https://bittrex.com/api/v1.1/public/getmarketsummary?market=USDT-btc"
	response = requests.request("GET", url)
	price = response.json()['result'][0]['Last']
	volume = response.json()['result'][0]['Volume']
	print(price,volume)
	return [price,volume]


def Bitfinex():
	url = "https://api.bitfinex.com/v1/pubticker/BTCUSD"
	response = requests.request("GET", url)
	price = response.json()['last_price'] 
	volume = response.json()['volume'] 
	print(price,volume)
	return [price,volume]

def GDAX():
	url = "https://api.gdax.com/products/BTC-USD/ticker"
	response = requests.request("GET", url)
	price = response.json()['price'] 
	volume = response.json()['volume'] 
	print(price,volume)
	return [price,volume]

def Bitstamp():
	url = "https://www.bitstamp.net/api/ticker/"
	response = requests.request("GET", url)
	price = response.json()['last'] 
	volume = response.json()['volume'] 
	print(price,volume)
	return [price,volume]



def Poloniex():
	url = 'https://poloniex.com/public?command=returnTicker'
	url2 =  'https://poloniex.com/public?command=return24hVolume'
	response = requests.request("GET", url)
	response2 = requests.request("GET", url2)
	price = response.json()['USDT_BTC']['last'] 
	volume = response2.json()['USDT_BTC']['BTC']
	print(price,volume)
	return [price,volume]

def Gemini():
	url = "https://api.gemini.com/v1/pubticker/btcusd"
	response = requests.request("GET", url)
	price = response.json()['last'] 
	volume = response.json()['volume']["BTC"]
	print(price,volume)
	return [price,volume]

def CalculatePrice():
	bfx = Bitfinex()
	gdax = GDAX()
	bstmp = Bitstamp()
	polx =Poloniex()
	gem = Gemini()
	exlist = (bfx,gdax,bstmp,polx,gem)
	prices = sorted([bfx[0],gdax[0],bstmp[0],polx[0],gem[0]])
	mid3 =prices[1:4]
	numerator = 0
	denominator = 0
	for i in exlist:
		if i[0] in mid3:
			numerator += (float(i[0])*float(i[1]))
			denominator += float(i[1])
			print (i,i[0],i[1])
	price = numerator / denominator
	price_format = int(price*1000)
	t1 = time.strftime("%H%M%S")
	title = 'btc_'+date
	tlist = ['Bitfinex','GDAX','BITSTAMP','Poloniex','Gemini']
	df = pd.DataFrame(columns=('time','date','price'))
	df.loc[1] = pd.Series({'time':t1, 'date':date, 'price':price_format})
	x=0
	for i in exlist:
		print (i)
		df[tlist[x]]=i[0]
		x +=1
	print(df)
	df.to_csv("C:/Code/Company/Oracle/Data/"+title+".csv")

	print(price)
	print(price_format)

CalculatePrice()
