FROM node:16.14.2 AS builder
WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT $ENVIRONMENT

ARG NPM_TOKEN
ENV NPM_TOKEN $NPM_TOKEN

COPY package*.json ./
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ./.npmrc
RUN npm install
RUN rm -f .npmrc

COPY . .
RUN npm run build:${ENVIRONMENT}

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/output /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
