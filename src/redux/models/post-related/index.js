import { action, thunk } from 'easy-peasy'
import Axios from 'axios'

const PostRelated = {
  initialState: {
    loading: true,
    error: false,
    errorMessage: null,
    items: null,
  },

  fetchAction: action((state, payload) => {
    state.initialState.items = payload
    state.initialState.loading = false
  }),

  error: action((state, payload) => {
    state.initialState.loading = true
    state.initialState.error = true
    state.initialState.errorMessage = payload
  }),

  getPostRelated: thunk(async (actions, payload) => {
    try {
      const { id, alias } = payload
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/post/related/${id}/${alias}`,
      }
      let response = await Axios(config)
      actions.fetchAction(response.data)
    } catch (error) {
      actions.error(error || error.errorMessage)
    }
  }),

  init: thunk(async (actions, payload, { dispatch }) => {
    await dispatch.PostRelated.getPostRelated()
  }),
}

export default PostRelated
