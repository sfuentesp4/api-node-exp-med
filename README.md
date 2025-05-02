# api-node-exp-med


git status
git switch <tu-rama>
git pull --rebase origin main

# Publicar en producción
1. Conectar a servidor vía Winscp y pegar los archivos nuevos (un api no se compila) en la carpeta /home/admin/Sitios/api
2. sudo cp -r /home/admin/Sitios/api/* /var/www/api-exp-med/
3. pm2 restart ApiMed    
4. pm2 flush solamente si es necesario.
5. pm2 log


# Actualizar BBDD

1. Ejecutar el sigueinte comando:

typeorm-model-generator -h 3.15.40.56 -d dbControlExpedienteMedico -p 1433 -u usrControlExpedienteMedico -x usrControlExpedienteMedico.25$ -e mssql -o ./src

2. Ejecutar el .js para corregir null

node add-non-null-assertions.js
