# Infumable English

### Build and run containers
```
 docker-compose up --build
```

## Testing, lintering and rswag
```
  docker-compose exec api rubocop && fasterer && rspec spec
  docker-compose exec api rails rswag # update rswag
```

## Credentials
```
  docker-compose run --rm -e EDITOR=vi api bin/rails credentials:edit -e production
  Rails.application.credentials[Rails.env.to_sym][:db][:user]
```

## Api created with command
```
  docker-compose run --no-deps api rails new . --force --database=postgresql --api
```
