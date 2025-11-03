FROM python:3.10-slim
WORKDIR /app

# Backend/backend/requirements.txt 파일을 복사
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Backend/backend/app/ 폴더를 컨테이너의 /app/app/ 으로 복사
COPY backend/app /app/app

# Backend/backend/main.py 파일을 컨테이너의 /app/main.py 로 복사
COPY backend/main.py /app/main.py

# FastAPI 실행 (8000번 포트)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
