#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")"

echo "🌆 Fongona City"

PORT="${PORT:-}"
if [ -z "$PORT" ]; then
PORT="$(python -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')"
fi

echo "🚀 Serveur : http://127.0.0.1:$PORT/"
echo "🛑 Arrêt : Ctrl+C"

exec python -m http.server "$PORT" --bind 127.0.0.1
