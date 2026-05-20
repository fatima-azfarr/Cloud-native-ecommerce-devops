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
            }
        }

        stage('Lint') {
            steps {
                echo 'Running lint...'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Kubernetes...'
            }
        }

        stage('Verify') {
            steps {
                echo 'Verifying deployment...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline SUCCESS'
        }

        failure {
            echo 'Pipeline FAILED'
        }
    }
}