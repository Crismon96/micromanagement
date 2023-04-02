FROM node:18-alpine as builder

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

# Bundle app source
COPY --chown=node:node . .

RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

FROM nginx:1.19-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]