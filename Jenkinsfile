pipeline {
    agent any
    environment {
        VERSION = "0.1.0" //Major.Minor.Patch
        DOCKERHUB_REPOSITORY = "imsongj/test"
        DOCKERHUB_CREDENTIAL = credentials('dockerhub-imsong')
        IMAGE_NAME = "test-lighthouse"
        SSH_CONNECTION = "ubuntu@i9a409.p.ssafy.io"
        ENV_DIR = "./config/.env"
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
        stage("Build Image") {
            steps {
                sh "docker compose build"
            }
        }
        stage('Push Docker Image'){
            steps {
                    sh "pwd"
                    sh "echo $DOCKERHUB_CREDENTIAL_PSW | docker login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin"
                    // sh "docker build -t $DOCKERHUB_REPOSITORY:$VERSION ."
                    sh "docker push $DOCKERHUB_REPOSITORY:$VERSION"   
               }
            
        }
        stage('Deploy on EC2') {
            steps {
                sshagent(credentials: ['ec2']) {
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rm -f $IMAGE_NAME'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rmi -f $DOCKERHUB_REPOSITORY:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker pull $DOCKERHUB_REPOSITORY:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker images'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker run -d --name $IMAGE_NAME --env-file $ENV_DIR -p 8081:8080 $DOCKERHUB_REPOSITORY:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker ps'"
                }
            }
        }
    }
}