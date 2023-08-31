# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV CI=true
ENV PORT=3000

COPY . ./
RUN npm i && npm run build

# add app

EXPOSE 3000
# start app
CMD ["npm", "start"]