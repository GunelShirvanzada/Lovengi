import { createSlice } from "@reduxjs/toolkit";

// useri localdan yükleme
const loadUser = () => {
  const serializedState = localStorage.getItem("user");
  return serializedState ? JSON.parse(serializedState) : null;
};

// useri locala save etme
const saveUser = (user) => {
  const serializedState = JSON.stringify(user);
  localStorage.setItem("user", serializedState);
};

const initialState = {
  user: loadUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // useri deyismek
    setUser(state, action) {
      state.user = action.payload;
      saveUser(state.user);
    },
    // useri silmek
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem("user");
    },
    // useri update etmek 
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
      saveUser(state.user);
    },
    // parol degisme
    updatePassword(state, action) {
      const { currentPassword, newPassword } = action.payload;
      // Parol doğrulama
      if (state.user && state.user.password === currentPassword) {
        state.user = { ...state.user, password: newPassword };
        saveUser(state.user);
      } else {
        throw new Error("Cari şifrə yanlışdır.");
      }
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
