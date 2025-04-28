FROM node:18-alpine


WORKDIR /app


RUN npm config set registry https://registry.npmjs.org/


COPY package*.json ./

RUN npm install --retry=5 --fetch-retries=5

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "start"]
