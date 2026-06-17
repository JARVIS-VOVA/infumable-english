# Infumable English
[![Backend CI](https://github.com/JARVIS-VOVA/infumable-english/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/JARVIS-VOVA/infumable-english/actions/workflows/backend-ci.yml)
[![Frontend CI](https://github.com/JARVIS-VOVA/infumable-english/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/JARVIS-VOVA/infumable-english/actions/workflows/frontend-ci.yml)
[![codecov](https://codecov.io/gh/JARVIS-VOVA/infumable-english/branch/main/graph/badge.svg)](https://codecov.io/gh/JARVIS-VOVA/infumable-english)

Infumavle English is easy program for quick study words

## Additional links

Swagger http://localhost:3000/api-docs/index.html

Figma https://www.figma.com/file/WoyEEo8LBPl67Wf5YL7NzT/Infumable-English

## 🔗 Project Links

### 🛠️ Deployment Services
- **Backend Hosting**: [Render Dashboard](https://dashboard.render.com)
- **Frontend Hosting**: [Vercel Dashboard](https://vercel.com)

### 🖥️ Live Demo
- [https://infumable-english.vercel.app](https://infumable-english.vercel.app)

# Backend

```
  # Backend was created with command
  rails new . --force --database=postgresql --api

  # Create *.key
  echo -n 'd3_fa0c205928111_978f6025d392ed7' >> backend/config/credentials/development.key
  echo -n '80b53bad_45af4dc1af4dabdb7051714' >> backend/config/credentials/production.key
  echo -n 'd62b5cfbb14a117d1f46_cb040d1d468' >> backend/config/credentials/test.key

  # Cache
  Check records in solid_cache_entries

  # Queue
  # Check records in solid_queue_jobs

  # Setup DB && seeds
  rails db:create && rails db:migrate && rails db:seed

  # Testing, lintering and rswag
  rubocop && fasterer && brakeman && rspec spec && rails rswag

  # Credentials
  EDITOR=vi bin/rails credentials:edit -e production
  Rails.application.credentials.dig(:db, :username)

  # Run Queue
  bundle exec rails solid_queue:start 
  # or PGGSSENCMODE=disable bin/jobs start

  # Run rails server
  rails s
```
 
# Frontend
```
  # Frontend was created with command
  bun create vite infumable-english --template react-ts 

  # Create frontend/.env
  cp frontend/.env.example frontend/.env

  # Run
  bun dev
```
