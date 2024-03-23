#!/bin/sh

# La base de datos se ejecuta en otro servicio y puede no estar lista
# inmediatamente cuando tu aplicación comienza a ejecutarse. Ajusta según sea necesario.

# Aplicar migraciones
python manage.py makemigrations emailapp
python manage.py migrate

# Iniciar el servidor
exec "$@"