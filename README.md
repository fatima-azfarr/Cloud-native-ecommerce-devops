# ShopFlow — Cloud-Native E-Commerce DevOps Project

COMSATS University Islamabad, Lahore Campus  
Course: Lab-DevOps for Cloud Computing | Semester 6

---

## Project Overview

A fully containerized, Kubernetes-orchestrated e-commerce platform built with
a microservices architecture and automated CI/CD pipelines.

---

## Microservices

| Service              | Port | Description                        |
|----------------------|------|------------------------------------|
| User Service         | 3001 | JWT auth, registration, profiles   |
| Product Service      | 3002 | Catalog, inventory, CRUD APIs      |
| Order Service        | 3003 | Order processing, status tracking  |
| Notification Service | 3004 | Email and in-app notifications     |
| Frontend             | 80   | Static HTML/CSS dashboard          |

---

## Tech Stack

- **Runtime:** Node.js + Express
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **CI/CD:** Jenkins + GitHub Actions
- **Registry:** Docker Hub
- **Monitoring:** Prometheus + Grafana
- **Version Control:** Git Flow (develop → staging → main)

---

## Folder Structure
cloud-native-ecommerce-devops/
├── .github/workflows/     # GitHub Actions CI/CD
│   ├── ci-dev.yml
│   ├── ci-staging.yml
│   └── ci-prod.yml
├── src/
│   ├── frontend/          # HTML/CSS/JS dashboard
│   ├── user-service/
│   ├── product-service/
│   ├── order-service/
│   └── notification-service/
├── k8s/                   # Kubernetes manifests
│   ├── configmap.yaml
│   ├── frontend-deployment.yaml
│   ├── user-deployment.yaml
│   ├── product-deployment.yaml
│   ├── order-deployment.yaml
│   └── notification-deployment.yaml
├── Dockerfile
├── Jenkinsfile
└── README.md
---

## Branch Strategy

| Branch    | Purpose                        | Auto-deploys to |
|-----------|--------------------------------|-----------------|
| `develop` | Active development             | Dev environment |
| `staging` | QA and integration testing     | Staging environment |
| `main`    | Production-ready code          | Production environment |

---

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/fatima-azfarr/Cloud-native-ecommerce-devops.git
cd cloud-native-ecommerce-devops
git checkout develop
```

### 2. Install dependencies
```bash
cd src/user-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
cd ../notification-service && npm install
```

### 3. Run a service locally
```bash
node src/user-service/server.js
# visit http://localhost:3001
```

### 4. Build Docker image
```bash
docker build -t shopflow:latest .
docker run -p 3001:3001 shopflow:latest
```

### 5. Deploy to Kubernetes
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```

---

## CI/CD Pipeline (Jenkins)

Stages: `Checkout` → `Install` → `Lint & Test` → `Docker Build` → `Push` → `Deploy` → `Notify`

## GitHub Actions

- Push to `develop` → triggers `ci-dev.yml`
- Push to `staging` → triggers `ci-staging.yml`
- Push to `main`    → triggers `ci-prod.yml` + deploys to Render

---

## Team

| Name | Role | Page |
|------|------|------|
| Team Lead | DevOps + Home Page | index.html |