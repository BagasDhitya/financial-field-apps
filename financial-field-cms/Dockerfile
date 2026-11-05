# financial-field-cms/Dockerfile
FROM node:20-alpine AS builder
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src

ENV PORT=7860
EXPOSE 7860

USER node
CMD ["npm", "run", "start"]