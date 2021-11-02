# Infumable English

[![CircleCI](https://circleci.com/gh/JARVIS-VOVA/infumable-english.svg?style=shield)](https://app.circleci.com/pipelines/github/JARVIS-VOVA)
[![codecov](https://codecov.io/gh/JARVIS-VOVA/infumable-english/branch/main/graph/badge.svg?token=9YV2GTED6Z)](https://codecov.io/gh/JARVIS-VOVA/infumable-english)

Infumavle Englist is easy program for quick study english words

## Quik start

### Setup
```
  git clone git@github.com:JARVIS-VOVA/infumable-english.git && cd infumable-english
```

### Create web/.env
```
  cp web/.env.example web/.env
```

### Create *.key
```
  echo '7728f22957c_8b9ad2966a1568bdbcba' >> api/config/master.key
  echo 'd3_fa0c205928111_978f6025d392ed7' >> api/config/credentials/development.key
  echo '80b53bad_45af4dc1af4dabdb7051714' >> api/config/credentials/production.key
  echo 'd62b5cfbb14a117d1f46_cb040d1d468' >> api/config/credentials/test.key

```

### Build and run containers
```
 docker-compose up --build
```

## Testing and lintering
```
  docker-compose exec api rubocop && fasterer && rspec spec
```

## Deploy
```
```

## Additional links
Take names colors for css from http://chir.ag/projects/name-that-color

## Credentials
```
  docker-compose run --rm -e EDITOR=vi api bin/rails credentials:edit -e production
  Rails.application.credentials[Rails.env.to_sym][:db][:user]
```

## Api created with command
```
  docker-compose run --no-deps api rails new . --force --database=postgresql --api
```
