# Stage 1: Build the React Application
FROM node:20-alpine AS builder
ARG API_URL
ENV VITE_API_URL=$API_URL
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent
COPY . .
RUN yarn run build

# Stage 2: Setup the Nginx Server to serve the React Application
FROM nginx:1.23-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
