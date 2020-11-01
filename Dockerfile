##############################################################################
# Use Ubuntu 18.04
##############################################################################

FROM ubuntu:18.04
WORKDIR /usr/src/prisma
COPY . .

##############################################################################
# Setting environment variables
##############################################################################
ENV NODE_ENV development
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 10.15.0
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

##############################################################################
# This forces the image to be build on every push!
##############################################################################
ARG CACHEBUST=0

##############################################################################
# Switch to bash
##############################################################################
SHELL ["/bin/bash", "--login", "-c"]

##############################################################################
# Install dependencies from Ubuntu
##############################################################################

RUN apt update --fix-missing && \
	apt install -y curl vim wget apt-utils gnupg2 xvfb libxtst6 libnss3 libgtk-3-0 libxss1 libasound2 && \
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash && \
	source $NVM_DIR/nvm.sh && \
	nvm install $NODE_VERSION

##############################################################################
# confirm installation of node
##############################################################################

RUN node -v
RUN npm -v

##############################################################################
# Install yarn
##############################################################################

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update && apt install -y yarn

##############################################################################
# Install Google Chrome
##############################################################################

RUN apt install -y libappindicator1 fonts-liberation libgbm1 xdg-utils
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && dpkg -i google-chrome-stable_current_amd64.deb

##############################################################################
# Install project dependencies
##############################################################################
RUN npm install -g @sherlog/cli && yarn install
CMD [ "./tests/run.sh"]
