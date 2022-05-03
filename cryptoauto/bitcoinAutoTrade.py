import time
import pyupbit
import datetime

access = "FDORZVXGfR4fyYoYBapt5pa7FQ399JfPiFaM6uDs"
secret = "HrkA8Uysh9siE3QtBHiyH7buCvsKhKU0VdHqvgfx"

def get_target_price(ticker, k):
    """변동성 돌파 전략으로 매수 목표가 조회"""
    df = pyupbit.get_ohlcv(ticker, interval="day", count=2)
    target_price = df.iloc[0]['close'] + (df.iloc[0]['high'] - df.iloc[0]['low']) * k
    return target_price

def get_start_time(ticker):
    """시작 시간 조회"""
    df = pyupbit.get_ohlcv(ticker, interval="day", count=1)
    start_time = df.index[0]
    return start_time

def get_balance(ticker):
    """잔고 조회"""
    balances = upbit.get_balances()
    for b in balances:
        if b['currency'] == ticker:
            if b['balance'] is not None:
                return float(b['balance'])
            else:
                return 0
    return 0

def get_current_price(ticker):
    """현재가 조회"""
    return pyupbit.get_orderbook(ticker=ticker)["orderbook_units"][0]["ask_price"]

# 로그인
upbit = pyupbit.Upbit(access, secret)
print("autotrade start")



# 5000 = btc * count
# 5000/count = btc


# 자동매매 시작
i = 0
coinName = "KRW-ALGO"
while True:
    i = i + 1
    try:
        now = datetime.datetime.now()
        start_time = get_start_time(coinName)
        end_time = start_time + datetime.timedelta(days=1)
        
        print("동작중입니다.{}".format(i))
        #9:00 < now < 8:59:50
        if start_time < now < end_time - datetime.timedelta(seconds=10):
            target_price = get_target_price(coinName, 0.5)
            current_price = get_current_price(coinName)
            print("현재가격은{}입니다.".format(current_price))
            if target_price < current_price:
                krw = get_balance("KRW")
                if krw > 5000:
                    upbit.buy_market_order(coinName, krw*0.9995)
                    print("매수")
        else:
            btc = get_balance(coinName)
            if btc > 5000/current_price:
                upbit.sell_market_order(coinName, btc*0.9995)
                print("매도")
        time.sleep(1)
    except Exception as e:
        print("에러발생{}: ".format(e))
        time.sleep(1)