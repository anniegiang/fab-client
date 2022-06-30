# (This is still under development as of 6/29/2022)

## Intro

A simplied web version of the FAB app.

#### Features:

- View messages and comments from artists and groups
- Send messages

#### Not supported:

- Purchasing points
- Unable to see images in messages

## Pre-reqs

- npm
- Your FAB `userid` and `acesstoken`

# How to get your FAB `userid` and `accesstoken`

In order to use this client, you will need to know your FAB `userid` and `accesstoken`.
This information is located in the _HTTP request headers_.
To see the request headers, use a proxy to inspect the network traffic. On iOS and Android, there are apps that let you inspect network traffic.

## Run locally

```
$ git clone https://github.com/anniegiang/fab-web-client.git
$ cd fab-web-client
$ npm install
$ npm run start
```

Open http://localhost:3000/

## Disclaimer

- Actions that cost points in the originl app will also cost points in this client. (ex: it cost points to open new messages and send messages.)
- Zero data is collected. All data is stored on the user's local machine.
- The developer has no intention to make a profit.
- The developer is not responsible for any loss or damages.
