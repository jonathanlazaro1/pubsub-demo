-include .env
export

requirements-update:
	python -m piptools compile --generate-hashes requirements.in --output-file requirements.txt
	python -m piptools compile --generate-hashes requirements-dev.in --output-file requirements-dev.txt

requirements-install:
	python -m piptools sync requirements.txt

requirements-dev-install:
	python -m piptools sync requirements-dev.txt requirements.txt

run:
	python main.py