FROM node:12 as frontendbuilder
COPY . /build/web
WORKDIR /build/web
RUN npm set registry https://registry.npm.taobao.org/ &&  npm install
ENV NODE_ENV production
RUN npm run build

FROM nginx:1.17-alpine
ENV TZ=Asia/Shanghai
COPY --from=frontendbuilder /build/web/dist /usr/share/nginx/html
