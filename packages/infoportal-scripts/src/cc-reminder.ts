import chalk from 'chalk'

// MEMO: groups nested twice are treated as one-level array, so the typing and mapping for HH members shelter_commonSpaces is fixed manually
const commonSpacesReminder = () =>
  console.log(
    `
  ${chalk.yellow("PLEASE KEEP MANUAL CHANGES FOR THE SHELTER'S COMMON SPACES")}

  ${chalk.white.bold.bgRedBright(' shelter_commonSpaces ')}

  ${chalk.yellow(`FOR THE REASON DESCRIBED IN THE MEMO COMMENT OF THE ${chalk.black.bold.bgYellowBright(' commonSpacesReminder ')} FUNCTION`)}
  `,
  )

export {commonSpacesReminder}
