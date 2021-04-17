FROM node:14.15.5-alpine

ENV APP_HOME /app
ENV TZ Asia/Tokyo

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN apk update
COPY . $APP_HOME
RUN chmod +x $APP_HOME/entrypoint.sh
RUN npm install
RUN npm run build
ENTRYPOINT ["/app/entrypoint.sh"]
