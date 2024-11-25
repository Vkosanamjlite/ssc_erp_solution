# ssc_erp_solution
 
python commands
-- setup and start app 
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
pip install psycopg2-binary
pip install django
python -m django --version 
5.0.4
pip install djangorestframework
pip install drf-spectacular

django-admin startproject app .

python manage.py migrate


python manage.py makemigrations 

docker build --build-arg DEV=true .


-- Create super user
python manage.py createsuperuser

-- run server
python manage.py runserver 0.0.0.0:8000 --noreload --nothreading --settings=app.settings