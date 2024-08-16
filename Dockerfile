FROM node:lts-alpine

# Agregamos la variable de entorno para que no de error al instalar
ARG VITE_API
ARG VITE_DOWNLOAD_TEMPLATES

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias e instala
COPY package*.json ./
RUN npm install

# Copia el código fuente de la aplicación
COPY . ./

# Genera la carpeta de distribución
RUN npm run build

# Instala un servidor estático
RUN npm install -g serve

# Expone el puerto en el que escuchará el servidor
EXPOSE 5000

# Comando para iniciar el servidor en producción
CMD ["serve", "-s", "dist", "--single"]

