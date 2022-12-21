FROM alpine:3.17

RUN curl -fsSL https://bun.sh/install | sh

ADD ./ /application/

WORKDIR /application

CMD ~/.bun/bin/bun src/index.ts