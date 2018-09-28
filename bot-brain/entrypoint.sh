#!/bin/bash

set -e

function print_help {
    echo "Available options:"
    echo " start commands (Rasa Core cmdline arguments) - Start Rasa Core server"
    echo " train                                        - Train a dialogue model"
    echo " start -h                                     - Print Rasa Core help"
    echo " help                                         - Print this help"
    echo " run                                          - Run an arbitrary command inside the container"
}

case ${1} in
    start)
        exec python -m rasa_core.run --enable_api -d models/current/dialogue -u models/current/nlu -o out.log --endpoints endpoints.yml --port 5002 --credentials creds/credentials.yml "${@:2}"
        ;;
    run)
        exec "${@:2}"
        ;;
    train)
        exec python -m rasa_core.train -s ./stories.md -d ./domain.yml -o ./out "${@:2}"
        ;;
    *)
        print_help
        ;;
esac


