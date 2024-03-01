FROM node:18.10-alpine3.15

WORKDIR /app

COPY package.json package.json

RUN npm i 

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "80"];