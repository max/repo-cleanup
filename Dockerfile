FROM node:slim

LABEL "com.github.actions.name"="repo-cleanup"
LABEL "com.github.actions.description"="Clean up after your test repositories"
LABEL "com.github.actions.icon"="github"
LABEL "com.github.actions.color"="blue"

COPY package*.json ./

RUN npm ci

COPY . .

ENTRYPOINT ["node", "/index.js"]
