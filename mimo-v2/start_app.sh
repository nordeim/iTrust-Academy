$ pkill -9 -f "python.*http.server.*5173" 2>/dev/null; sleep 1
cd /home/project/iTrust-Academy/mimo-v2/dist && nohup python3 -m http.server 5173 > /tmp/server.log 2>&1 &
sleep 3
curl -s http://localhost:5173/ | head -1

# Kill existing server and rebuild
# Kill any existing server processes
fuser -k 5174/tcp 2>/dev/null || true
pkill -9 -f "python.*http.server.*5174" 2>/dev/null || true
sleep 2
# Rebuild to get latest changes
cd /home/project/iTrust-Academy/mimo-v2 && npm run build 2>&1 | tail -5
