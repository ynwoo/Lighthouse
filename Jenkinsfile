pipeline {
    agent any
    environment {
        VERSION = "latest" //Major.Minor.Patch
        DOCKERHUB_REPOSITORY_BACK = "imsongj/test_backend"
        DOCKERHUB_REPOSITORY_FRONT = "imsongj/test_frontend"
        DOCKERHUB_CREDENTIAL = credentials('dockerhub-imsong')
        CONTAINER_NAME_BACK = "test-lighthouse-back"
        CONTAINER_NAME_FRONT = "test-lighthouse-front"
        SSH_CONNECTION = "ubuntu@i9a409.p.ssafy.io"
        ENV_DIR = "./config/.env"
        PORT_BACK = "8081"
        PORT_FRONT = "80"
    }
    stages {
        stage('Build Backend') {
            steps {
                dir('backend/lighthouse') {
                    sh "chmod +x gradlew"
                    sh "./gradlew clean compileJava bootJar"
               }
            }
        }
        stage("Build Images") {
            steps {
                sh "docker compose build"
            }
        }
        stage('Push Images'){
            steps {
                    sh "echo $DOCKERHUB_CREDENTIAL_PSW | docker login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin"
                    sh "docker push $DOCKERHUB_REPOSITORY_BACK:$VERSION"
                    sh "docker push $DOCKERHUB_REPOSITORY_FRONT:$VERSION"
            }
        }
        stage('Deploy Backend Server') {
            steps {
                sshagent(credentials: ['ec2']) {
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rm -f $CONTAINER_NAME_BACK'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rmi -f $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker pull $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'echo y | docker image prune'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker images'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker run -d --name $CONTAINER_NAME_BACK --env-file $ENV_DIR -p $PORT_BACK:8080 $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker ps'"
                }
            }
        }
        stage('Deploy Frontend Server') {
            steps {
                sshagent(credentials: ['ec2']) {
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rm -f $CONTAINER_NAME_FRONT'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rmi -f $DOCKERHUB_REPOSITORY_FRONT:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker pull $DOCKERHUB_REPOSITORY_FRONT:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'echo y | docker image prune'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker images'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker run -d --name $CONTAINER_NAME_FRONT --env-file $ENV_DIR -p $PORT_FRONT:3000 $DOCKERHUB_REPOSITORY_FRONT:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker ps'"
                }
            }
        }
    }
}
