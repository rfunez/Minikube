FROM ubuntu
WORKDIR /app
RUN mkdir models
ARG backendDir=./backend
COPY ${backendDir}/package.json .
COPY ${backendDir}/.env .
COPY ${backendDir}/Tarea.js ./models
COPY ${backendDir}/server.js .
RUN apt update -y
#RUN apt install -y curl
#RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash
#RUN apt install -y nodejs
RUN npm install express mongoose dotenv
ENTRYPOINT [ "node", "server.js" ]