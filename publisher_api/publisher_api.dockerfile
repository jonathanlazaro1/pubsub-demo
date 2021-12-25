FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install pip-tools
RUN python -m piptools sync requirements.txt

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
