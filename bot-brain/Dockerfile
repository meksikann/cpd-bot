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
RUN pip install -r requirements.txt

## spacy models
RUN pip install rasa_nlu[spacy]
RUN python -m spacy download en

## rasa core
RUN pip install rasa_core

ENTRYPOINT ["./entrypoint.sh"]

CMD ["start"]
