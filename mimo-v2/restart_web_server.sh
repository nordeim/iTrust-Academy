cd /home/project/iTrust-Academy/mimo-v2
lsof -i :5174
fuser -k 5174/tcp 

nohup npm run preview -- --port 5174 --host 0.0.0.0 &
lsof -i :5174
curl 'http://localhost:5174/'
