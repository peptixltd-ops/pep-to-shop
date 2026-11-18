FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
EXPOSE 9000
CMD ["sh", "-c", "npx medusa db:migrate && npx medusa start"]
