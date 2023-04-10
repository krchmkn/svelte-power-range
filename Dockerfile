FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
CMD ["npm", "run", "preview"]