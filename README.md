Bitcoin - API con nestjs, postgres, docker.
Creado por Alejandro Valenzuela
## GUIA NESTJS
## Debugger

```bash
# Crear un carpeta : .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Nest Framework",
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
      "args": ["${workspaceFolder}/src/main.ts"],
      "autoAttachChildProcesses": true
    }
  ]
}
# y luego con f5 podemos usar el debugger
```

## Desarrollo

```bash
# instalamos dependencia de desarrolla para variables de entorno (Uso solo en desarrollo).
npm i -D dotenv @types/dotenv
# modulos:
nest g module config

# dependencia para base de dato, en este caso postgres
npm i --save @nestjs/typeorm typeorm pg
# Conexion db con docker
docker run -d -p 5444:5432 --name my-postgres -e POSTGRES_PASSWORD=postgres postgres
# Crea orm.config.json nos va a servir para hacer las migraciones..
ver el archivo orm.config.json
# para las migraciones, hay que generar los comando en package.json y hacer la conexion a db
npm i -g ts-node
ver el archivo package.json
# comando para docker consola:
docker exec -it id bash
psql -U postgres -d postgres -h localhost
CREATE DATABASE nombre_db;
\c nombre_db #Use database_name
\d #List tablas en base de datos
\du #Mostrar usuarios

#  instalamos class-validator para validar
npm i class-validator

# para auth
npm i @nestjs/passport @nestjs/jwt passport-jwt bcryptjs jsonwebtoken passport class-transformer
# para ayuda desarrollo a typescript
npm i -D @types/bcryptjs @types/passport @types/passport-jwt
```
