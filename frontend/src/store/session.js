import csrfFetch from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// const storeCSRFToken = (response) => {
//   const csrfToken = response.headers.get("X-CSRF-Token");
//   if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// };

// export const restoreSession = () => async (dispatch) => {
//   const response = await csrfFetch("/api/session");
//   storeCSRFToken(response);
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

export const login =
  ({ credential, password }) => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// const sessionReducer = ( state = {}, action ) => {
//     const nextState = { ...state };

//     switch(action.type) {
//         case SET_USER:
//             nextState[action.user.id] = action.user;
//             return nextState;
//         case REMOVE_USER:
//             delete nextState[action.userId];
//             return nextState;
//         default:
//             return state;
//     }
// };


export default sessionReducer;