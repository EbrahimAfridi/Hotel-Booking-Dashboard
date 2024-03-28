import supabase, {supabaseUrl} from "./supabase.js";

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

// Update user data function

export async function updateUserData({ password, fullName, avatar }) {
//   1. Update password or full name

  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName){
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

//   2. Upload avatar img

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

//   3. Update avatar in the user

  const { data: updateUser, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updateError) throw new Error(updateError.message);

  return updateUser;
}