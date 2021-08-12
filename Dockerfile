FROM node:14
WORKDIR /usr/gromo/app/
COPY . /usr/gromo/app/
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod 777 /usr/gromo/app/wait-for-it.sh
RUN npm install
EXPOSE 4000
CMD ["/bin/bash","wait-for-it.sh"]
