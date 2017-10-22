FROM debian:9
COPY api/build/ /app/
COPY app/build/ /app/public/
WORKDIR /app/
CMD /app/react-seo