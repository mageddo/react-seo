FROM alpine:3.1
COPY api/build /app
COPY app/build /app/public
CMD /app/react-seo