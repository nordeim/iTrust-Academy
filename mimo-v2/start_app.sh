$ pkill -9 -f "python.*http.server.*5173" 2>/dev/null; sleep 1
cd /home/project/iTrust-Academy/mimo-v2/dist && nohup python3 -m http.server 5173 > /tmp/server.log 2>&1 &
sleep 3
curl -s http://localhost:5173/ | head -1
