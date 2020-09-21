FROM node:12

# Create App Directory
WORKDIR /usr/src/app/proxy

# copy everything needed to run the backend
COPY ./* ./
COPY certs ./certs/


# Install everything needed to run the server
RUN npm install

EXPOSE 8541

CMD ["node", "proxy.js"]