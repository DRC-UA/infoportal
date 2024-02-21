import {exec, execSync} from 'child_process'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  mainBranch: 'master',
  gitServer: `https://${encodeURIComponent(process.env.DEPLOY_USER)}:${encodeURIComponent(process.env.DEPLOY_PWD)}@drc-imaa-ukr-tools-api.scm.azurewebsites.net:443/drc-imaa-ukr-tools-api.git`,
}

const run = (cl) => {
  console.log(cl)
  return new Promise((resolve, reject) => {
    const _ = exec(cl)
    _.stdout?.on('data', console.log)
    _.stderr?.on('data', console.error)
    _.on('exit', code => {
      if (code === 0) {
        resolve(code)
      } else {
        console.log(`${cl} exited with ${code}`)
        reject(code)
      }
    })
  })
}

const gitWorkspaceIsEmpty = () => execSync(`git status --porcelain`).toString() === ''

const newversion = process.argv[2] ?? 'patch' //as 'patch' | 'minor' | 'major'

const getPackageVersion = () => JSON.parse(fs.readFileSync('package.json', 'utf8')).version

const isOnMainBranch = () => new RegExp(`${config.mainBranch}\s*\n*`).test(execSync('git branch --show-current').toString())

;(async () => {
  // if (!isOnMainBranch()) {
  //   console.error(`You must be on branch ${config.mainBranch} to publish.`)
  // } else if (!gitWorkspaceIsEmpty()) {
  //   console.error(`Your git status must be clean before to publish.`)
  // } else {
  await run(`git remote remove azure`).catch(console.error)
  await run(`git remote add azure ${config.gitServer}`)
  await run(`git push -f azure ${config.mainBranch}`)
  await run(`git remote remove azure`)
  // await run(`git commit -m "Release ${getPackageVersion()}"`)
  // await run(`git push https://${config.username}:${config.password}@${config.gitServer} master`)
  console.log(`Successfully deployed!`)
  // }
})()
// toggle 9