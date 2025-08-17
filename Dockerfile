# 1. Temel image
FROM node:20-alpine

# 2. Çalışma dizini
WORKDIR /app

# 3. package.json ve package-lock.json / yarn.lock kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Uygulama dosyalarını kopyala
COPY . .

# 6. Build (production için)
# RUN npm run build

# 7. Container başlatma
CMD ["npm", "start"]
