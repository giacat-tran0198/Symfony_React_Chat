sh
set MERCURE_PUBLISHER_JWT_KEY=tranquoc
set MERCURE_SUBSCRIBER_JWT_KEY=tranquoc
set SERVER_NAME=:3000
set ALLOW_ANONYMOUS=1
set CORS_ALLOWED_ORIGINS=*
.\mercure\mercure.exe run -config .\mercure\Caddyfile.dev
