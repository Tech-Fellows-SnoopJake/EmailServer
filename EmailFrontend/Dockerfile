FROM node:18.10-alpine3.15

WORKDIR /app
COPY . /app

COPY package.json package.json

RUN npm i 

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--port", "80"];