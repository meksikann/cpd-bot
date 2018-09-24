.PHONY: clean train-nlu train-core cmdline make train-nluserver

TEST_PATH=./

help:
	@echo "    clean"
	@echo "        Remove python artifacts and build artifacts."
	@echo "    train-nlu"
	@echo "        Trains a new nlu model using the projects Rasa NLU config"
	@echo "    train-core"
	@echo "        Trains a new dialogue model using the story training data"

clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f  {} +
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info
	rm -rf docs/_build

train-nlu:
	python -m rasa_nlu.train -c nlu_config.yml --data data/nlu_data.md -o models --fixed_model_name nlu --project current --verbose

train-core:
	python -m rasa_core.train -d domain.yml -s data/stories -o models/current/dialogue --epochs 200

cmdline:
	python -m rasa_core.run -d models/current/dialogue -u models/current/nlu
core-server:
	python -m rasa_core.run --enable_api -d models/current/dialogue -u models/current/nlu -o out.log
core-learn:
	python -m rasa_core_sdk.endpoint --actions actions& python -m rasa_core.train --online -o models/current/dialogue -d domain.yml -s data/stories -u models/current/nlu

