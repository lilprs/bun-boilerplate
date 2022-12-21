FROM debian:11.6-slim

RUN apt-get update && apt-get install -y curl unzip

RUN curl -fsSL https://bun.sh/install | bash && apt-get purge -y curl unzip && apt-get clean -y 

ADD ./ /application/

WORKDIR /application

CMD ~/.bun/bin/bun src/index.ts