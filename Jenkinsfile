pipeline {
  agent any
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
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        echo 'javascript Linter'
        sh 'npm run eslint'
      }
    }
    stage('Migrate') {
      environment {
        NODE_ENV= 'development'
      }
      steps {
        echo 'Knex migration'
        sh 'npm run knex migrate:rollback'
        sh 'npm run knex migrate:latest'
        sh 'npm run knex seed:run'
      }
    }
    stage('Test') {
      environment {
        NODE_ENV= 'development'
      }
      steps {
        echo 'Test'
        sh 'npm run coverage'
      }
    }
    stage('Sonar') {
      steps {
        echo 'Sonar Analysis'
        withSonarQubeEnv('Sonarqube_env'){
          sh 'npm run sonar'
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
        stage('Database Deployment') {
          environment {
            PSQL_USER_LOGIN = "${PSQL_USER_LOGIN_PROD}"
            PSQL_AUTH_KEY = "${PSQL_AUTH_KEY_PROD}"
          }
          steps {
            echo 'Database updated'
            sh 'npm run knex migrate:rollback'
            sh 'npm run knex migrate:latest'
            sh 'npm run knex seed:run'
          }
        }
        stage('App Deployment') {
          environment {
            PSQL_USER_LOGIN = "${PSQL_USER_LOGIN_USER}"
            PSQL_AUTH_KEY = "${PSQL_AUTH_KEY_USER}"
          }
          steps {
            echo 'App restarted'
            // =>/var/lib/jenkins/node-app/jenkins_test_angular_nodejs/back/
            dir('../../node-app/jenkins_test_angular_nodejs/back/') {
              sh 'git pull'
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
      archiveArtifacts artifacts: 'coverage/**/*', fingerprint: true
      echo 'JENKINS PIPELINE'
    }

    success {
      slackSend(
        channel: 'otake',
        failOnError: true,
        color: 'good',
        token: env.SLACK_TOKEN,
        message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' was successful\n App Deployed.',
        baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE SUCCESSFUL'
    }

    failure {
      slackSend(
        channel: 'otake',
        failOnError: true,
        color: 'danger',
        token: env.SLACK_TOKEN,
        message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' was failed\n ' +
        env.GIT_COMMITTER_NAME + ' has done something wrong',
        baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE FAILED'
    }

    unstable {
      slackSend(
        channel: 'otake',
        failOnError: true,
        color: 'warning',
        token: env.SLACK_TOKEN,
        message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' was unstable',
        baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
    }

    changed {
      slackSend(
        channel: 'otake',
        failOnError: true,
        color: 'danger',
        token: env.SLACK_TOKEN,
        message: 'Job: ' + env.JOB_NAME + ' with buildnumber ' + env.BUILD_NUMBER + ' its resulat was unclear',
        baseUrl: env.SLACK_WEBHOOK)

      echo 'JENKINS PIPELINE STATUS HAS CHANGED SINCE LAST EXECUTION'
    }
  }
}
