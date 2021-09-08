import { call, put } from 'redux-saga/effects'
import { ToastActionsCreators } from 'react-native-redux-toast'

import api from '~/services/api'
import MembersActions from '../ducks/members'


export function* getMembers () {
    try {
	    const response = yield call(api.get, 'members')

	    yield put(MembersActions.getMembersSuccess(response.data))
    }
    catch (err) {
    }
}


export function* updateMember ({ id, roles }) {
	try {
		yield call(api.put, `members/${id}`, {
			roles: roles.map(role => role.id)
		})

		yield put(ToastActionsCreators.displayInfo(
			'O membro foi atualizado com sucesso.'
		))
	}
	catch (err) {
		yield put(ToastActionsCreators.displayError(
			'Houve um erro, tente novamente!'
		))
	}
}


export function* inviteMember ({ email }) {
	try {
		yield call(api.post, 'invites', { invites: [email] })

		yield put(ToastActionsCreators.displayInfo(
			'Enviamos um convite ao usuário para participar do time.'
		))
	}
	catch (err) {
		yield put(ToastActionsCreators.displayError(
			'Houve um erro, tente novamente!'
		))
	}
}
