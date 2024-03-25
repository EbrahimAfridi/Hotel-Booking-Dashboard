import supabase from "./supabase.js";

// Signup function
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      }
    }
  });

  if (error) throw new Error(error.message);

  return data;
}

// Login function
export async function login({ email, password }) {

  let {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// Function to get the current user
export async function getCurrentUser() {
  const {data: sessionData} = await supabase.auth.getSession();

  if (!sessionData.session) return null;

  const {data, error} = await supabase.auth.getUser();

  // console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

// Logout function

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
