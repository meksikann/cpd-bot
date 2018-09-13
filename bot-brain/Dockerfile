FROM python:2.7-slim

SHELL ["/bin/bash", "-c"]
RUN apt-get update -qq && \
  apt-get install -y --no-install-recommends \
  build-essential \
  wget \
  openssh-client \
  graphviz-dev \
  pkg-config \
  git-core \
  openssl \
  libssl-dev \
  libffi6 \
  libffi-dev \
  libpng-dev \
  curl && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  mkdir /app

WORKDIR /app

COPY . /app

# rasa stack
## rasa nlu
RUN pip install -r alt_requirements/requirements_full.txt


## spacy models
RUN pip install rasa_nlu[spacy]
CMD [ "python", "-m spacy download en_core_web_md" ]
CMD [ "python", "-m spacy download en" ]
CMD [ "python", "-m spacy.en.download" ]
CMD [ "python", "-m spacy link en_core_web_md en" ]

## rasa core
RUN pip install rasa_core

# volumes
VOLUME ["/app/models/current/dialogue", "/app/models/current/nlu"]


EXPOSE 5005

ENTRYPOINT ["./entrypoint.sh"]

CMD ["start", "-d", "./models/current/dialogue", "-u", "./models/current/nlu"]
