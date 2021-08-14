FROM alpine
RUN apk add --no-cache ca-certificates
WORKDIR /app
COPY ./alumni /app/
COPY ./stempel-sign.png /app/
EXPOSE 9099:9099
EXPOSE 8099:8099
CMD [ "/app/alumni"]