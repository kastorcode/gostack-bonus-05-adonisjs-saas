import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { ToastActionsCreators } from 'react-native-redux-toast'

import api from '~/services/api'
import TeamsActions from '../ducks/teams'


export function* getTeams () {
	const response = yield call(api.get, 'teams')

	yield put(TeamsActions.getTeamsSuccess(response.data))
}


export function* createTeam ({ name }) {
	try {
		const response = yield call(api.post, 'teams', { name })

		yield put(TeamsActions.createTeamSuccess(response.data))
		yield put(TeamsActions.closeTeamModal())

		yield put(ToastActionsCreators.displayInfo(
			'Time criado.'
		))
	}
	catch (err) {
		yield put(ToastActionsCreators.displayError(
			'Houve um erro, tente novamente.'
		))
	}
}


export function* setActiveTeam ({ team }) {
	yield call([AsyncStorage, 'setItem'], '@Omni:team', JSON.stringify(team))
}