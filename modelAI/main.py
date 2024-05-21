# Phương Trang
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from recommend import recommend

app = FastAPI()

# Thêm middleware CORS để cho phép truy cập từ mọi nguồn
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Có thể điều chỉnh điều này để hạn chế hơn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đường dẫn đến thư mục chứa dữ liệu
cd = os.getcwd()
data_path = os.path.join(os.path.dirname(cd), 'modelAI\\data')
# Load dữ liệu vào DataFrame từ tệp CSV
df = pd.read_csv(os.path.join(data_path,'data.csv'))

# Kiểm tra xem máy chủ đã kết nối chưa
@app.get("/ping")
def pong():
    return {"ping": "pong!"}

# Lấy các gợi ý từ tên mặt hàng và tên người dùng
@app.get("/recommend/")
async def get_recommendations(item_name: str, user_name):
    print(item_name)
    # Đọc dữ liệu từ tệp CSV mỗi lần có yêu cầu
    cd = os.getcwd()
    data_path = os.path.join(os.path.dirname(cd), 'modelAI\\data')
    df = pd.read_csv(os.path.join(data_path,'data.csv'))

    # Kiểm tra xem mặt hàng có trong dữ liệu không
    if item_name not in df['Items'].values: 
        # Nếu không tìm thấy, ném ra một ngoại lệ HTTP 404
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Gọi hàm recommend để lấy các gợi ý dựa trên tên mặt hàng và tên người dùng
    recommendations = recommend(item_name, df=df, user=user_name)
    return {"recommendations": recommendations}

