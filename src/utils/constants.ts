export const PORT: number = parseInt(process.env.PORT || '', 10) || 3000
export const IS_PRODUCTION_BUILD = process.env.NODE_ENV === 'production'
export const PROJECT_NAME = process.env.PROJECT_NAME || null
export const CIRCLECI_TOKEN = process.env.CIRCLECI_TOKEN || null
export const CIRCLE_JOB = 'deploy'
