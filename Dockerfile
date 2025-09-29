from node:24
workdir /app
copy package*.json ./
copy public_html ./public_html
run npm install --production 

expose 3000
cmd["node", "."]