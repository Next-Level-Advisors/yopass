FROM golang:bookworm AS app
RUN mkdir -p /yopass
WORKDIR /yopass
COPY . .
RUN go build ./cmd/yopass && go build ./cmd/yopass-server

FROM node:22 AS website
COPY website /website
WORKDIR /website
RUN yarn install --network-timeout 600000 && yarn build

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=app /yopass/yopass /yopass/yopass-server /
COPY --from=website /website/build /public

# Create a wrapper script to handle environment variables
RUN echo '#!/bin/sh\n\
exec /yopass-server --port=${PORT:-8080} --address=0.0.0.0 --database=redis --redis=${REDIS_URL:-redis://localhost:6379/0} "$@"' > /entrypoint.sh && \
chmod +x /entrypoint.sh

EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["/entrypoint.sh"]
