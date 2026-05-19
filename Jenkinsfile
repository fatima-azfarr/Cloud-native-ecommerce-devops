pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('dockerhub-username')
        IMAGE_NAME       = 'shopflow'
        IMAGE_TAG        = "v1.${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                dir('src/user-service')         { sh 'npm install' }
                dir('src/product-service')      { sh 'npm install' }
                dir('src/order-service')        { sh 'npm install' }
                dir('src/notification-service') { sh 'npm install' }
            }
        }

        stage('Lint & Test') {
            steps {
                echo 'Running lint and tests...'
                dir('src/user-service')         { sh 'npm test --if-present' }
                dir('src/product-service')      { sh 'npm test --if-present' }
                dir('src/order-service')        { sh 'npm test --if-present' }
                dir('src/notification-service') { sh 'npm test --if-present' }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest ."
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing image to Docker Hub...'
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes cluster...'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/user-deployment.yaml'
                sh 'kubectl apply -f k8s/product-deployment.yaml'
                sh 'kubectl apply -f k8s/order-deployment.yaml'
                sh 'kubectl apply -f k8s/notification-deployment.yaml'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying pods are running...'
                sh 'kubectl get pods'
                sh 'kubectl get services'
            }
        }

    }

    post {
        success {
            echo "✅ Pipeline succeeded! Image: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Pipeline failed. Check logs above."
        }
    }
}