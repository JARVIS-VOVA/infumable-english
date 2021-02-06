# Infumable English

[![CircleCI](https://circleci.com/gh//tree/master.svg?style=svg)](https://circleci.com//tree/master)

Infumavle Englist is easy program for quick study english words

## Quik start

### Setup
```
  git clone git@github.com:JARVIS-VOVA/infumable-english.git && cd infumable-english
```

### Create web/.env
```
  cp frontend/.env.example frontend/.env
```

### Create master.key
```
  echo 'fc1c74_0e5e3c44__98af7bb94ffba10' >> api/config/master.key
```

### Build and run containers
```
 docker-compose up --build
```

## Testing
```
```

## Deploy
```
```

## Additional links
Take names colors for css from http://chir.ag/projects/name-that-color

## Credentials
```
  docker-compose run --rm -e EDITOR=vi api bin/rails credentials:edit
  Rails.application.credentials[Rails.env.to_sym][:db][:user]
```
