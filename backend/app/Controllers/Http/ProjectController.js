'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const projects = request.team.projects().fetch()

    return projects
  }


  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['title'])
    const project = request.team.projects().create(data)

    return project
  }


  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    const project = await request.team.projects()
      .where('id', params.id)
      .first()

    if (!project) {
      return response.status(400).send()
    }

    return project
  }


  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const project = await request.team.projects()
      .where('id', params.id)
      .first()

    if (!project) {
      return response.status(400).send()
    }

    const data = request.only(['title'])

    project.merge(data)
    await project.save()

    return project
  }


  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const project = await request.team.projects()
      .where('id', params.id)
      .first()

    if (!project) {
      return response.status(400).send()
    }

    await project.delete()
  }
}


module.exports = ProjectController
