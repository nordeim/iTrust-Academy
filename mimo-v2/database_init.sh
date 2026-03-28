# Check Python and Django version
cd /home/project/iTrust-Academy/mimo-v2/backend && source /opt/venv/bin/activate && python --version && python -c "import django; print(f'Django {django.VERSION}')" 2>&1 || echo "Django not found in venv"
#Python 3.12.3
#Django (6, 0, 3, 'final', 0)

# Django 6.0.3 is installed. Now let me run the migrations to initialize the database
cd /home/project/iTrust-Academy/mimo-v2/backend && source /opt/venv/bin/activate && python manage.py migrate --run-syncdb 2>&1
