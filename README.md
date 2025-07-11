# Infumable English
[![CircleCI](https://circleci.com/gh/JARVIS-VOVA/infumable-english.svg?style=shield)](https://app.circleci.com/pipelines/github/JARVIS-VOVA)
[![codecov](https://codecov.io/gh/JARVIS-VOVA/infumable-english/branch/main/graph/badge.svg?token=9YV2GTED6Z)](https://codecov.io/gh/JARVIS-VOVA/infumable-english)

Infumavle Englist is easy program for quick study english words

## Additional links
Take names colors for css from http://chir.ag/projects/name-that-color

Swagger http://localhost:3000/api-docs/index.html

Figma https://www.figma.com/file/WoyEEo8LBPl67Wf5YL7NzT/Infumable-English

## Download project
```
  git clone git@github.com:JARVIS-VOVA/infumable-english.git && cd infumable-english
```

# API
## Quick start

### Create *.key
```
  echo -n '7728f22957c_8b9ad2966a1568bdbcba' >> api/config/master.key
  echo -n 'd3_fa0c205928111_978f6025d392ed7' >> api/config/credentials/development.key
  echo -n '80b53bad_45af4dc1af4dabdb7051714' >> api/config/credentials/production.key
  echo -n 'd62b5cfbb14a117d1f46_cb040d1d468' >> api/config/credentials/test.key
```

### Setup DB && seeds
```
  rails db:create && rails db:migrate && rails db:seed
```

## Testing, lintering and rswag
```
  rubocop && fasterer && rspec spec
  rails rswag # update rswag
```

## Run
```
  rails s
```

## Deploy
```
```

## Credentials
```
  EDITOR=vi bin/rails credentials:edit -e production
  Rails.application.credentials[Rails.env.to_sym][:db][:user]
```

## Api was created with command
```
  rails new . --force --database=postgresql --api
```

# WEB
## Quick start

### Create web/.env
```
  cp web/.env.example web/.env
```

## Run
```
  yarn start
```

## Available Scripts
```
  yarn build
```

## Deploy

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

## Web was created with Create React App

[Create React App](https://github.com/facebook/create-react-app)
