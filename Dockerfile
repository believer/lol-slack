FROM ilix/alpine-node

WORKDIR /app
ADD ./package.json /app/package.json
RUN npm install --production

ADD ./app.js /app/app.js
ADD ./lib /app/lib
ADD ./services /app/services
ADD ./utils /app/utils

CMD node app.js
