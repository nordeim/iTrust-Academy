# Start Django development server
cd /home/project/iTrust-Academy/mimo-v2/backend && source /opt/venv/bin/activate && python manage.py runserver 0.0.0.0:8000 > /tmp/django_server.log 2>&1 &
echo $!

# Test Django API endpoint
sleep 3 && curl -s http://localhost:8000/api/v1/ | head -20

# Test courses API endpoint
$ curl -s http://localhost:8000/api/v1/courses/ | python3 -m json.tool 2>/dev/null | head -60
