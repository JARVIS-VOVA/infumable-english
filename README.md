# Infumable English
[![CircleCI](https://circleci.com/gh/JARVIS-VOVA/infumable-english.svg?style=shield)](https://app.circleci.com/pipelines/github/JARVIS-VOVA)
[![codecov](https://codecov.io/gh/JARVIS-VOVA/infumable-english/branch/main/graph/badge.svg?token=9YV2GTED6Z)](https://codecov.io/gh/JARVIS-VOVA/infumable-english)

Infumavle English is easy program for quick study words

## Additional links
Take names colors for css from http://chir.ag/projects/name-that-color

Swagger http://localhost:3000/api-docs/index.html

Figma https://www.figma.com/file/WoyEEo8LBPl67Wf5YL7NzT/Infumable-English

## Download project
```
  git clone git@github.com:JARVIS-VOVA/infumable-english.git && cd infumable-english
```

# 🔗 Project Links

## 🌐 API Endpoints
- **Health Check**: [https://infumable-english.onrender.com/api/healthz](https://infumable-english.onrender.com/api/healthz)
- **Health Check**: [https://infumable-english.onrender.com/up](https://infumable-english.onrender.com/up)

## 🛠️ Deployment Services
- **Backend Hosting**: [Render Dashboard](https://dashboard.render.com)
- **Frontend Hosting**: [Vercel Dashboard](https://vercel.com)

## 🖥️ Frontend
- **Live Demo**: [https://infumable-english.vercel.app](https://infumable-english.vercel.app)

# API
## Quick start

### Create *.key
```
  echo -n 'd3_fa0c205928111_978f6025d392ed7' >> api/config/credentials/development.key
  echo -n '80b53bad_45af4dc1af4dabdb7051714' >> api/config/credentials/production.key
  echo -n 'd62b5cfbb14a117d1f46_cb040d1d468' >> api/config/credentials/test.key
```

### Setup DB && seeds
```
  rails db:create && rails db:migrate && rails db:seed
```

### Testing, lintering and rswag
```
  rubocop && fasterer && brakeman && rspec spec && rails rswag
```

### Cache
Check records in solid_cache_entries

### Queue
Check records in solid_queue_jobs
```
  bundle exec rails solid_queue:start
```

### Run rails server
```
  rails s
```

### Deploy
```
```

### Credentials
```
  EDITOR=vi bin/rails credentials:edit -e production
  Rails.application.credentials.dig(:db, :username)
```

### Api was created with command
```
  rails new . --force --database=postgresql --api
```

# WEB
## Quick start

### Create web/.env
```
  cp web/.env.example web/.env
```

### Run
```
  yarn start
```

### Available Scripts
```
  yarn build
```

### Deploy

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### Web was created with Create React App

[Create React App](https://github.com/facebook/create-react-app)
