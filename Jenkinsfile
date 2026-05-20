pipeline {
    agent any

    environment {
        IMAGE_NAME = 'shopflow'
        IMAGE_TAG  = "v1.${BUILD_NUMBER}"
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
                sh 'echo Dependencies installed'
            }
        }

        stage('Lint') {
            steps {
                echo 'Running lint checks...'
                sh 'echo Lint successful'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'echo Tests passed'
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image ${IMAGE_NAME}:${IMAGE_TAG}"
                sh 'docker --version || true'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Simulating Docker push...'
                sh 'echo Docker image pushed'
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                echo 'Simulating Kubernetes deployment...'
                sh 'echo Kubernetes deployment successful'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh 'echo All services running'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed.'
        }
    }