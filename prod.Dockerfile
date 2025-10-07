FROM ubuntu:22.04
ENV NODE_VERSION=20.8.1
RUN apt-get update && \
    apt-get install wget curl ca-certificates rsync -y
RUN wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" &&  nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/node /usr/bin/
RUN cp /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm /usr/bin/
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install leasot@latest -g
RUN /root/.nvm/versions/node/v${NODE_VERSION}/bin/npm install yarn -g
RUN apt-get install -y pdftk
RUN apt-get install -y pdftk-java
RUN mkdir -p /app
RUN mkdir -p /app/public/files/jupe
RUN mkdir -p /app/public/files/pantalon
WORKDIR /app
COPY package.json ./

ARG PORT
ENV PORT=${PORT}
ARG MVOLA_CONSUMER_KEY
ENV MVOLA_CONSUMER_KEY=${MVOLA_CONSUMER_KEY}
ARG MVOLA_CONSUMER_SECRET
ENV MVOLA_CONSUMER_SECRET=${MVOLA_CONSUMER_SECRET}
ARG MVOLA_CREDIT_NUMERO
ENV MVOLA_CREDIT_NUMERO=${MVOLA_CREDIT_NUMERO}
ARG MVOLA_URL
ENV MVOLA_URL=${MVOLA_URL}
ARG SENDGRID_API_KEY
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}

RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8000
CMD ["yarn", "prod"]
