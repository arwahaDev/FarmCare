import {
  ok,
  bad,
  readList,
  writeList,
  uid,
} from "../index";

const USERS_KEY = "agri_users";
const SESSION_KEY = "agri_session";

// Get all users
export function getAllUsers() {
  return Promise.resolve(ok(readList(USERS_KEY)));
}

// Get one user by ID
export function getUser(userId) {
  const users = readList(USERS_KEY);

  const user = users.find(
    (item) => String(item.id) === String(userId)
  );

  if (!user) {
    return Promise.resolve(bad("User not found"));
  }

  return Promise.resolve(ok(user));
}

// Create Admin or Manager
export function createUser(user) {
  const users = readList(USERS_KEY);

  if (!user.name || !user.email || !user.password || !user.role) {
    return Promise.resolve(bad("All fields are required"));
  }

  if (!["Admin", "Manager"].includes(user.role)) {
    return Promise.resolve(bad("Invalid user role"));
  }

  const emailExists = users.some(
    (item) =>
      item.email.toLowerCase() === user.email.toLowerCase()
  );

  if (emailExists) {
    return Promise.resolve(bad("Email already exists"));
  }

  const newUser = {
    ...user,
    id: uid(),
    email: user.email.toLowerCase(),
  };

  const saved = writeList(USERS_KEY, [...users, newUser]);

  if (!saved) {
    return Promise.resolve(bad("User could not be saved"));
  }

  return Promise.resolve(
    ok(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      "User created successfully"
    )
  );
}

// Login
export function login(email, password) {
  const users = readList(USERS_KEY);

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return Promise.resolve(bad("Invalid email or password"));
  }

  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(sessionUser)
    );

    return Promise.resolve(ok(sessionUser, "Login successful"));
  } catch (error) {
    return Promise.resolve(bad("Session could not be saved"));
  }
}

// Logout
export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY);
    return Promise.resolve(ok(null, "Logout successful"));
  } catch (error) {
    return Promise.resolve(bad("Logout failed"));
  }
}

// Update user
export function updateUser(updatedUser) {
  const users = readList(USERS_KEY);

  const updatedUsers = users.map((user) =>
    String(user.id) === String(updatedUser.id)
      ? { ...user, ...updatedUser }
      : user
  );

  const saved = writeList(USERS_KEY, updatedUsers);

  if (!saved) {
    return Promise.resolve(bad("User update failed"));
  }

  return Promise.resolve(ok(updatedUser, "User updated successfully"));
}

// Remove user
export function removeUser(userId) {
  const users = readList(USERS_KEY);

  const updatedUsers = users.filter(
    (user) => String(user.id) !== String(userId)
  );

  const saved = writeList(USERS_KEY, updatedUsers);

  if (!saved) {
    return Promise.resolve(bad("User removal failed"));
  }

  return Promise.resolve(ok({ id: userId }, "User removed successfully"));
}
// Initialize default Admin and Manager accounts
export function initializeDefaultUsers() {
  const users = readList(USERS_KEY);

  const defaultUsers = [
    {
      name: "Farm Admin",
      email: "admin@example.com",
      password: "AdminDemo#2026",
      role: "Admin",
    },
    {
      name: "Farm Manager",
      email: "manager@example.com",
      password: "ManagerDemo#2026",
      role: "Manager",
    },
  ];

  const newUsers = defaultUsers
    .filter(
      (newUser) =>
        !users.some(
          (user) =>
            user.email.toLowerCase() ===
            newUser.email.toLowerCase()
        )
    )
    .map((user) => ({
      ...user,
      id: uid(),
    }));

  if (newUsers.length === 0) {
    return Promise.resolve(ok(null, "Default users already exist"));
  }

  const saved = writeList(USERS_KEY, [...users, ...newUsers]);

  return Promise.resolve(
    saved
      ? ok(null, "Default users initialized")
      : bad("Default users could not be created")
  );
}