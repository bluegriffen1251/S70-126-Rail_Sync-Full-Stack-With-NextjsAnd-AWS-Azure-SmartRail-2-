# 1. Base Image
FROM node:18-alpine

# 2. Working Directory
WORKDIR /app

# 3. Copy dependencies and install
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the code
COPY . .

# 5. BUILD THE APP (Crucial for Next.js)
RUN npm run build

# 6. Expose the port
EXPOSE 3000

# 7. Start the app --
CMD ["npm", "start"]