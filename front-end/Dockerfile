FROM node:12

# Create App Directory
WORKDIR /usr/src/app/front-end

# copy everything needed to run the backend
COPY dev-front-end ./
COPY certs ../certs/


# Install everything needed to run the server
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]