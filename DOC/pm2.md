


## Для продакшена через PM2:

```bash

# один раз
npm i -g pm2
npm run build

# запуск
pm2 start dist/main.js --name mb-back-nest

# или с .env
pm2 start dist/main.js --name mb-back-nest --env production
```

## Полезные команды:

```bash

pm2 status

pm2 logs mb-back-nest

pm2 restart mb-back-nest

pm2 stop mb-back-nest

pm2 delete mb-back-nest

# автозапуск после перезагрузки сервера
pm2 startup

pm2 save
```

## Удобнее через `ecosystem.config.cjs` в корне проекта:

```bash

npm run build
pm2 start ecosystem.config.cjs
```

### Перед запуском нужны собранный `dist/` и заполненный `.env` (DB_*, PORT).
