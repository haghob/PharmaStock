#!/bin/bash
echo "Arrêt des processus existants..."
pkill -f pharma-inventory
echo "Nettoyage et reconstruction du projet..."
mvn clean install -e
if [ $? -ne 0 ]; then
    echo "La construction du projet a échoué. Veuillez vérifier les logs pour plus de détails."
    exit 1
fi
echo "Démarrage de l'application..."
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8080 > application.log 2>&1 &
tail -f application.log