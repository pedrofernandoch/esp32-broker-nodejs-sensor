import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import { baseApiUrl } from '../common/utils/systemConstants'
import { TOKEN_VALIDATED, USER_FETCHED_AUTH } from '../common/utils/actionTypes'

export function login(values) {
    return dispatch => {
        axios.post(`${baseApiUrl}/signin`, values)
            .then(resp => {
                dispatch([
                    { type: USER_FETCHED_AUTH, payload: resp.data }
                ])
            })
            .catch(e => {
                if(e && e.response && e.response.data){
                    toastr.error('Erro', e.response.data)
                } else if(typeof e === 'string'){
                    toastr.error('Erro', e)
                }else{
                    toastr.error('Erro', 'Oops.. Erro inesperado.')
                }
            })
    }
}

export function logout() {
    return { type: TOKEN_VALIDATED, payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${baseApiUrl}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: TOKEN_VALIDATED, payload: resp.data })
                })
                .catch(e => dispatch({ type: TOKEN_VALIDATED, payload: false }))
        } else {
            dispatch({ type: TOKEN_VALIDATED, payload: false })
        }
    }
}