# api-node-exp-med






# Publicar en producción
1. Conectar a servidor vía Winscp y pegar los archivos nuevos (un api no se compila) en la carpeta /home/admin/Sitios/api
2. sudo cp -r /home/admin/Sitios/api/* /var/www/api-exp-med/
3. pm2 restart ApiMed    
4. pm2 flush solamente si es necesario.
5. pm2 log

