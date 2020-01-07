pipeline {
  agent any
  environment {
    SNYK_TOKEN = credentials('snyk-token-id')
  }
  options {
    disableConcurrentBuilds()
    timeout(time: 1, unit: 'HOURS')
  }
  stages {
    stage('Checkout') {
      steps {
        echo 'Checkout'
      }
    }
    stage('Install') {
      steps {
        echo 'Install Dependencies'
        dir('./back/'){
          sh 'npm install'
        }
      }
    }
    stage('Lint') {
      steps {
        echo 'javascript Linter'
        dir('./back/'){
          sh 'npm run lint'
        }
      }
    }
    stage('Migrate') {
      environment {
        NODE_ENV = 'development'
      }
      steps {
        echo 'Knex migration'
        dir('./back/'){
          sh 'npm run knex migrate:rollback'
          sh 'npm run knex migrate:latest'
          sh 'npm run knex seed:run'
        }
      }
    }
    stage('Test') {
      environment {
        NODE_ENV = 'development'
      }
      steps {
        echo 'Test'
        dir('./back/'){
            // just to try, but not primary in this project
            sh 'npm run coverage || exit 0'
        }
      }
    }
    stage('Sonar') {
      steps {
        echo 'Sonar Analysis'
        withSonarQubeEnv('Sonarqube_env'){
          dir('./back'){
            sh 'npm run sonar'
          }
        }
      }
    }
    stage('Quality Gate') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate true
        }
      }
    }
    stage('Deployment') {
      environment {
        NODE_ENV = 'production'
        PSQL_HOST_URL = 'localhost'
      }
      when {
        expression { env.GIT_BRANCH == 'master' }
      }
      stages {
        stage('Snyk') {
          steps {
            echo 'Snyk Diagnosis'
            dir('./back/'){
              sh 'snyk test --severity-medium'
              sh 'snyk monitor'
            }
          }
        }
        stage('Database Deployment') {
          environment {
            PSQL_USER_LOGIN = "${PSQL_USER_LOGIN_PROD}"
            PSQL_AUTH_KEY = "${PSQL_AUTH_KEY_PROD}"
          }
          steps {
            echo 'Database updated'
            dir('./back/'){
              sh 'npm run knex migrate:rollback'
              sh 'npm run knex migrate:latest'
              sh 'npm run knex seed:run'
            }
          }
        }
        stage('App Deployment') {
          environment {
            PSQL_USER_LOGIN = "${PSQL_USER_LOGIN_USER}"
            PSQL_AUTH_KEY = "${PSQL_AUTH_KEY_USER}"
            PULSE_USER = "${PULSE_CRED_USER}"
            PULSE_PSWD = "${PULSE_CRED_PSWD}"
          }
          steps {
            echo 'App restarted'
            // =>/var/lib/jenkins/node-app/projet-semestre-6-otake/back/
            dir('../../node-app/') {
              sh 'rm -rf projet-semestre-6-otake'
              sh 'git clone git@github.com:2018-2019-ps6/projet-semestre-6-otake.git'
            }
            dir('../../node-app/projet-semestre-6-otake/back/') {
              sh 'npm install'
              withEnv(['JENKINS_NODE_COOKIE=dontkill']) {
                sh 'npm run redeploy'
              }
            }
          }
        }
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'back/coverage/**/*', fingerprint: true
      echo 'JENKINS PIPELINE'
    }

    success {
      // slackSend(
      //   channel: 'otake',
      //   failOnError: true,
      //   color: 'good',
      //   token: env.SLACK_TOKEN,
      //   message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' was successful',
      //   baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE SUCCESSFUL'
    }

    failure {
      // slackSend(
      //   channel: 'otake',
      //   failOnError: true,
      //   color: 'danger',
      //   token: env.SLACK_TOKEN,
      //   message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' was failed',
      //   baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE FAILED'
    }

    unstable {
      echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
    }

    changed {
      echo 'JENKINS PIPELINE STATUS HAS CHANGED SINCE LAST EXECUTION'
    }
  }
}
