import pyupbit

access = "FDORZVXGfR4fyYoYBapt5pa7FQ399JfPiFaM6uDs"          # 본인 값으로 변경
secret = "HrkA8Uysh9siE3QtBHiyH7buCvsKhKU0VdHqvgfx"          # 본인 값으로 변경
upbit = pyupbit.Upbit(access, secret)

print(upbit.get_balance("KRW-XRP"))     # KRW-XRP 조회 코인의 가격
print(upbit.get_balance("KRW"))         # 보유 현금 조회