FROM node:14.17-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY public ./
COPY index.html ./
COPY src/ ./src

RUN npm install
CMD npm run build
