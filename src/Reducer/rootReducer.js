const initialState = {
  isAuth: false,
  user: null,
};

if(localStorage.getItem("authToken")){
  initialState.isAuth=true;
  initialState.user = JSON.parse(localStorage.getItem("user"));
}

const rootReducer = function (state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return { isAuth: true, user: action.payload };
    case "LOGOUT":
      return { isAuth: false, user: null };
    default:
      return state;
  }
};

export default rootReducer;
