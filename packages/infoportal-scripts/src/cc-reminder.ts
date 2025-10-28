import chalk from 'chalk'

const commonSpacesReminder = () =>
  console.log(
    `
  ${chalk.yellow("PLEASE KEEP MANUAL CHANGES FOR THE SHELTER'S COMMON SPACES")}

  ${chalk.white.bold.bgRedBright(' shelter_commonSpaces ')}

  ${chalk.yellow('FOR THE REASON DESCRIBED IN THE MEMO COMMENT')}
  `,
  )

export {commonSpacesReminder}
