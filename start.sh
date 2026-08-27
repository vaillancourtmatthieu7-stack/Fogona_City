#!/data/data/com.termux/files/usr/bin/bash
echo "🌆 Fongona City"
echo "Démarrage du serveur..."
python -m http.server 8080 --bind 0.0.0.0
