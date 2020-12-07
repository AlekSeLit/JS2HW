const state = {
  data: {},
  itemsOnPage: [],
  itemsInCart: [],
}

const getters = {
  getData: state => state.data,
  getItemsOnPage: state => state.itemsOnPage,
  getItemsInCart: state => state.itemsInCart,
}

const actions = {
  requestData ({ commit }, page = 1) {
    if (!page) {
      return
    }

    return fetch(`/itemslist/${page}`, {
      method: 'GET'
    }) // /itemslist/1  /itemslist/2
      .then(res => {
        return res.json()
      })
      .then(data => {
        commit('setData', data)
      })
  },
  addInCart ({ state, commit }, id) {
    commit('addInCart', id)
  },
  addItem({ state, commit }, data) {
    fetch('/itemslist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res)
      })
  }
}

const mutations = {
  setData (state, newData) {
    state.data = { ...state.data, ...newData }
    state.itemsOnPage.push(...Object.keys(newData))
  },
  addInCart (state, id) {
    state.itemsInCart.push(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
