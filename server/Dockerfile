FROM node:12

# Create App Directory
WORKDIR /usr/src/app/server

# copy everything needed to run the backend
COPY ./* ./

EXPOSE 8543

CMD ["node", "server.js"]