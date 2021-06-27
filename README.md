# Discord Bot Streaming Now
When someone have role `streamer`, Voice channel name will change to
```
[On Air 🔴] - <Your voice channel name>
```
# TODO
1. ✅ Use role streamer
2. ⬜ Store data to file or database
3. 🆗 Refactor!
4. ⬜ Slash commands

# Getting Started
### Prerequisites

1. Use Linux OS
2. For development Install
   1. Nodejs
   2. Nodemon
   3. Yarn
3. Install Docker [read more](https://docs.docker.com/engine/install/ubuntu/)
    1. Install docker
        ```
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        ```
        ```
        echo \
        "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        ```
        ```
        sudo apt-get update
        sudo apt-get install docker-ce docker-ce-cli containerd.io
        ```
    2. Post-installation steps for Linux [(read more)](https://docs.docker.com/engine/install/linux-postinstall/)
        ```
        sudo groupadd docker
        sudo usermod -aG docker $USER
        ```
    3. Log out and log back in so that your group membership is re-evaluated
4. Start Docker service
    ```
    sudo systemctl start docker
    ```
5. Install Docker compose [read more](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

    1. Run this command to download the current stable release of Docker Compose:
        ```
        sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        ```
    2. Apply executable permissions to the binary:
        ```
        sudo chmod +x /usr/local/bin/docker-compose
        ```
## Environment file .env
```
TOKEN=<Your Discord authentication token>
USER_WISHLIST=<List of user you wanna listen>
```
> `USER_WISHLIST=<User ID>,<User ID>`

## Run server
```
docker-compose up
```

## Run development
```
yarn dev
```
