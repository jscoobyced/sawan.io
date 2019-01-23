FROM ubuntu:latest

RUN sed -i 's/archive.ubuntu.com/th.archive.ubuntu.com/g' /etc/apt/sources.list
ENV DEBIAN_FRONTEND noninteractive
RUN groupadd -r mongodb && useradd -r -g mongodb mongodb
RUN apt-get -qq update
RUN apt-get install -qqy --no-install-recommends apt-utils
RUN apt-get -qq upgrade
RUN apt-get install -qqy --no-install-recommends \
    curl gnupg vim ca-certificates apt-transport-https \
    software-properties-common
RUN curl -o /tmp/server-4.0.asc -k -L https://www.mongodb.org/static/pgp/server-4.0.asc
RUN apt-key add /tmp/server-4.0.asc
RUN echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list
RUN rm /tmp/server-4.0.asc
RUN curl -o /tmp/packages-microsoft-prod.deb -k -L https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb
RUN dpkg -i /tmp/packages-microsoft-prod.deb
RUN add-apt-repository universe
RUN apt-get -qq update
RUN apt-get install -qqy \
        mongodb-org-server mongodb-org-tools mongodb-org-shell \
        aspnetcore-runtime-2.2
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/lib/mongodb
RUN apt-get clean
RUN mkdir -p /data/db /data/configdb /data/scripts
RUN chown -R mongodb:mongodb /data/db /data/configdb /data/scripts
VOLUME /data/db /data/configdb /data/scripts
COPY entrypoint.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 27017
CMD ["mongod", "--bind_ip_all"]