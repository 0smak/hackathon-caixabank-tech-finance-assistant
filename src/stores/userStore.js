import { atom } from "nanostores";

export const userStore = atom([]);

if (process.env.NODE_ENV === "development") {
  window.userStore = userStore;
}

export const getUserByEmail = (email) => {
  const user = userStore.get().find((user) => user.email === email);
  return user;
};

export const addUser = (user) => {
  const currentUsers = userStore.get();
  const updatedUsers = [...currentUsers, user];
  userStore.set(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const deleteUser = (email) => {
  const currentUsers = userStore.get();
  const updatedUsers = currentUsers.filter((user) => user.email !== email);
  userStore.set(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const getUsers = () => {
  return userStore.get();
};

export const updateUser = (email) => {
  const currentUsers = userStore.get();
  const updatedUsers = currentUsers.map((user) => {
    if (user.email === email) {
      return {
        ...user,
      };
    }
    return user;
  });
  userStore.set(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const checkCredentials = (email, password, defaultUser) => {
  if (defaultUser.email === email && defaultUser.password === password) {
    return true;
  }
  const user = getUserByEmail(email);
  return user?.password === password;
};
