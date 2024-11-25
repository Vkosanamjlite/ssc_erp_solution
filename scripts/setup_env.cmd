@echo off

:: Check if env folder exists
if not exist "env" (
    echo Virtual environment not found. Creating it...
    python -m venv env
)

:: Activate the virtual environment
call env\Scripts\activate

:: Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

:: Install requirements if requirements.txt exists
if exist "requirements.txt" (
    echo Installing dependencies from requirements.txt...
    pip install -r requirements.txt
) else (
    echo requirements.txt not found. Skipping dependency installation.
)

echo Environment setup complete.
pause
