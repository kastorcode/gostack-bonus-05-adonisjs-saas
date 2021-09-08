'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class Team {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const slug = request.header('TEAM')

    if (!slug) {
      return response.status(400).json({
        error: 'Team header must be provided.'
      })
    }

    const team = await auth.user.teams()
      .where('slug', slug)
      .first()

    if (!team) {
      return response.status(404).json({
        error: 'Team not found.'
      })
    }

    auth.user.currentTeam = team.id
    request.team = team

    // call next to advance the request
    await next()
  }
}


module.exports = Team
